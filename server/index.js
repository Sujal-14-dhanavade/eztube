require("dotenv").config();  //reading our own environment variables

const { Server } = require("mongodb"); 
/*
    REQUIRED MODULES
*/
const {
  express,  //express server
  next, //next app server for accept request
  homeRoute,      // crud operatuions
  bodyParser,   //data parsing in json
  mongoose,     //connecting to mongodb
  multer,       //grid storages divide bigger file into smaller file using multer
  cors,         //take req. resp. from different port number cross origin sever
  GridFsStorage,        //Streaming data store in mongodb
  watchRoute,       //audio playing
  getPicRoute,      // surojeet part related to frontend
  session,      //for se3ssion cookies
  MongoDbSession        // for storing session in mongodb database
} = require("./library");

// importing GRID storages avatar is picture
const {
  audioStorage,
  songAvatarStorage,
  playlistAvatarStorage,
  userAvatarStorage,
  albumAvatarStorage,
} = require("./models/GridStorages");

// importing controllers for storages

const registerUserPic = require("./controllers/api").registerUserPic; //controller to store user pic in database

// MONGO CONNECTION AND GRID FS MODALS AUDIO, AND PLAYLIST, ALBUM, USER AND SONG PIC

let audio, userPic, albumPic, playlistPic, songPic, sessionStorage;

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("database connected");
    mongoose.connection.once("open", function () {
      console.log("connected");
    });
//Gridfs schema is mongodb schema
    const audioGrid = new GridFsStorage(audioStorage);
    const userGrid = new GridFsStorage(userAvatarStorage);
    const albumGrid = new GridFsStorage(albumAvatarStorage);
    const playlistGrid = new GridFsStorage(playlistAvatarStorage);
    const songGrid = new GridFsStorage(songAvatarStorage);
    sessionStorage = new MongoDbSession({
      uri: process.env.DATABASE,
      collection: 'session'
    })
    audio = multer({ storage: audioGrid });
    userPic = multer({storage: userGrid});
    songPic = multer({storage: songGrid});
    playlistPic = multer({storage: playlistGrid});
    albumPic = multer({storage: albumGrid});
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// create storage engine for audio

// starting development mode

const dev = process.env.NODE_ENV !== "production";

// selecting port

const port = process.env.PORT || 3000;

// accessing next server app

const app = next({ dir: ".", dev });

// handler to handle all requests

const handle = app.getRequestHandler();

// preparing next app to connect to express server as backend
app.prepare().then(() => {

  // express server
  const server = express();

  // middlewares for server
  server.use(session({
    secret: process.env.SECRET,     //for decrypting cookie which we send to client 
    resave: false,              //don't resave until it is changed
    saveUninitialized: false,
    store: sessionStorage,
    cookie: {
      maxAge: 3600000 * 24 * 14
    }
  }))
  server.use(express.static(__dirname + "/public"));        // search images in public folder _dirname returns present directory
  server.use(bodyParser.urlencoded({extended: true}));      //url encoded form
  server.use(bodyParser.json());
  server.use(cors());       //use of cross origin



  // @Routes API
  // @desc CRUD operation with mongoDB
  server.use("/api", homeRoute);

  // @Routes POST /api/audioUpload
  // @desc uploads audios to mongo server
  server.post("/api/audioUpload", audio.single("audioFile"), (req, res) => {
    res.json({file: req.file.id});
  });

  // @Routes POST /api/userPicUpload
  // @desc uploads user avatar to mongo server
  server.post("/api/userPicUpload", userPic.single("userPicFile"), registerUserPic);

  // @Routes POST /api/albumPicUpload
  // @desc uploads album avatar to mongo server
  server.post("/api/albumPicUpload", albumPic.single("albumPicFile"), (req, res) => {
    res.json({albumPicId: req.file.id});
  });

  // @Routes POST /api/playlistPicUpload
  // @desc uploads playlist avatar to mongo server
  server.post("/api/playlistPicUpload", playlistPic.single("playlistPicFile"), (req, res) => {
    res.json({file: req.file.id});
  });

  // @Routes POST /api/songPicUpload
  // @desc uploads audios to mongo server
  server.post("/api/songPicUpload", songPic.single("songPicFile"), (req, res) => {
    res.json({file: req.file.id});
  });

  // @Routes POST /watch/audioTitle
  // @desc get audios from mongo server surojeet part
  server.use("/watch", watchRoute);

  // @Routes POST /avatar/picType/id
  // @desc get pic from mongo server
  server.use("/avatar", getPicRoute);

  // @Handling next requests

  // @Routes app Welcome page
  // @desc if user already logged in redirect to main page or welcome page
  server.get("/", (req, res) => {
    if(req.session.isAuth) {
      res.redirect("/Ezport");
    } else {
      return handle(req, res);
    }
  })
  
  // @Routes app main page
  // @desc if user already logged in redirect to main page or welcome page
  server.get("/Ezport", (req, res) => {
    if(req.session.isAuth) {
      return handle(req, res);
    } else {
      res.redirect("/");
    }
  })

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
