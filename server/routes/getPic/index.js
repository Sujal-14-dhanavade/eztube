const Router = require("express").Router;
const {
  getAlbumPic,
  getSongPic,
  getPlaylistPic,
  getUserPic,
} = require("../../controllers/getPic");
const router = Router();

router.get("/userPic/:userPic", getUserPic);
router.get("/avatarPic/:albumPic", getAlbumPic);
router.get("/songPic/:songPic", getSongPic);
router.get("/playlistPic/:playlistPic", getPlaylistPic);

module.exports = router;
