const Router = require("express").Router;
const router = Router();
const {
  register,
  login,
  getData,
  logout,
  update,
  getAlbum,
  createAlbum,
  registerSong,
  getSongs,
  createPlaylist,
  getPlaylist,
  addSongPlaylist,
  getSongPlaylist,
  likeSong
} = require("../../controllers/api");

router.route("/").get((req, res) => {
  res.status(200).json({ started: true });
});

router.route("/isAuth").get((req, res) => {
  if (req.session.isAuth) {
    res.status(200).json({ isAuth: 1 });
  } else {
    res.status(200).json({ isAuth: 0 });
  }
});

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/getData").post(getData);
router.route("/logout").post(logout);
router.route("/updateInfo").post(update);
router.route("/getAlbums").post(getAlbum);
router.route("/createAlbum").post(createAlbum);
router.route("/addSong").post(registerSong);
router.route("/getSongs").get(getSongs);
router.route("/createPlaylist").post(createPlaylist);
router.route("/getPlaylist").get(getPlaylist);
router.route("/addSongPlaylist").post(addSongPlaylist);
router.route("/getSongPlaylist").post(getSongPlaylist);
router.route("/likeSong/:method").post(likeSong);
module.exports = router;
