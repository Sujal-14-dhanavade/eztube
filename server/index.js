require("dotenv").config();

/*
    REQUIRED MODULES
*/
const {
  express,
  next,
  homeRoute,
  bodyParser,
  mongoose,
  multer,
  GridFsStorage,
  path,
  crypto,
  cors,
  _,
} = require("./library");

// MONGO CONNECTION

const database = "mongodb://localhost:27017/eztube";

let video;

mongoose
  .connect(database)
  .then(() => {
    console.log("database connected");
    mongoose.connection.once("open", function () {
      console.log("connected");
    });
    const storage = new GridFsStorage({
      url: database,
      file: (req, file) => {
        return new Promise((resolve, reject) => {
          crypto.randomBytes(16, (err, buf) => {
            if (err) {
              return reject(err);
            }
            const filename =
              buf.toString("hex") + path.extname(file.originalname);
            const fileInfo = {
              filename: filename,
              bucketName: "videos",
            };
            resolve(fileInfo);
          });
        });
      },
    });
    video = multer({ storage });
  })
  .catch((err) => {
    console.error("Database connection error:", error);
  });

// create storage engine for video

// starting development mode

const dev = process.env.NODE_ENV !== "production";

// selecting port

const port = process.env.PORT || 3000;

// next app

const app = next({ dir: ".", dev });

// handler to handle all requests

const handle = app.getRequestHandler();

// preparing next app to connect to express server as backend
app.prepare().then(() => {
  // express server
  const server = express();

  // initializing server
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());
  server.use(cors());

  // @Routes API
  // @desc CRUD operation with mongoDB
  server.use("/api", homeRoute);

  // @Routes POST /api/videoUpload
  // @desc uploads videos to mongo server
  server.post("/api/videoUpload", video.single("videoFile"), (req, res) => {
    res.send("video upload");
  });

  // @Routes POST /watch/videoTitle
  // @desc get videos from mongo server
  server.get("/watch/:videoTitle", (req, res) => {
    const range = req.headers.range;
    if (!range) {
      res.status(400).send("Requires Range header");
    }
    let gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "videos",
    });
    const id = mongoose.Types.ObjectId(req.params.videoTitle);
    gfs
      .find({ _id: id })
      .toArray()
      .then((files) => {
        if (!files || files.length === 0) {
          res.status(404).json({
            err: "No Files Exist",
          });
        }
        let file = files[0];
        const videoSize = file.length;
        
        const start = Number(range.replace(/\D/g, ""));
        const chunkSize = file.chunkSize;
        const end = Math.min(videoSize - 1, chunkSize + start);
        const contentLength = end - start + 1;
        const headers = {
          "Content-Range": `bytes ${start}-${end}/${videoSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": contentLength,
          "Content-Type": "video/mp4",
        };
        

        // HTTP Status 206 for Partial Content
        res.writeHead(206, headers);
        const downloadStream = gfs.openDownloadStream(file._id, {
          start,
          end
        });

        downloadStream.pipe(res);
      });
  });

  // @Routes rest are handled by next.js
  server.get("*", (req, res) => {
    return handle(req, res);
  });

  const appServer = server.listen(port, () => {
    console.log("Server Started");
  });

  // handled abrupt disconnection
  process.on("SIGINT", (_) => {
    appServer.close(() => {
      console.log("server closed :- reason -> interrupted");
      mongoose.connection.close();
      process.exit(0);
    });
    // If server hasn't finished in 1000ms, shut down process
    setTimeout(() => {
      process.exit(0);
    }, 1000).unref(); // Prevents the timeout from registering on event loop
  });

  // handled graceful disconnection
  process.on("SIGTERM", (_) => {
    appServer.close(() => {
      console.log("server closed properly");
      mongoose.connection.close();
      process.exit(0);
    });
    // If server hasn't finished in 1000ms, shut down process
    setTimeout(() => {
      process.exit(0);
    }, 1000).unref(); // Prevents the timeout from registering on event loop
  });
});
