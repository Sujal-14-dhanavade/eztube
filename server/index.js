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
  cors,
  _,
  watchRoute,
} = require("./library");

// importing GRID storages
const {
  audioStorage,
  songAvatarStorage,
  playlistAvatarStorage,
  userAvatarStorage,
  albumAvatarStorage,
} = require("./models/GridStorages");

// MONGO CONNECTION AND GRID FS MODALS AUDIO, AND PLAYLIST, ALBUM, USER AND SONG PIC

let audio, userPic, albumPic, playlistPic, songPic;

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("database connected");
    mongoose.connection.once("open", function () {
      console.log("connected");
    });

    audio = multer({ audioStorage });
    userPic = multer({userAvatarStorage});
    songPic = multer({songAvatarStorage});
    playListPic = multer({playlistAvatarStorage});
    albumPic = multer({albumAvatarStorage});
  })
  .catch((err) => {
    console.error("Database connection error:", error);
  });

// create storage engine for audio

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
  server.use(express.static(__dirname + "/public"));
  // initializing server
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());
  server.use(cors());

  // @Routes API
  // @desc CRUD operation with mongoDB
  server.use("/api", homeRoute);

  // @Routes for testing
  server.get("/api/redirect", (req, res) => {
    res.redirect("/");
  });

  // @Routes POST /api/audioUpload
  // @desc uploads audios to mongo server
  server.post("/api/audioUpload", audio.single("audioFile"), (req, res) => {
    res.send("audio upload");
  });

  // @Routes POST /watch/audioTitle
  // @desc get audios from mongo server
  server.use("/watch", watchRoute);

  // @Routes rest are handled by next.js
  server.get("*", (req, res) => {
    return handle(req, res);
  });

  const appServer = server.listen(port, () => {
    console.log("Server Started");
  });

  // handles abrupt disconnection
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
