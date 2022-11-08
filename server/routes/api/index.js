const Router = require("express").Router;
const router = Router();
const register = require("../../controllers/api").register;
const login = require("../../controllers/api").login;
const getData = require("../../controllers/api").getData;
const logout = require("../../controllers/api").logout;
const update = require("../../controllers/api").update;
const getAlbum = require("../../controllers/api").getAlbum;
const createAlbum = require("../../controllers/api").createAlbum;

router.route("/").get((req, res) => {
  res.status(200).json({started: true});
})

router.route("/isAuth").get((req, res) => {
  if(req.session.isAuth) {
    res.status(200).json({isAuth: 1});
  } else {
    res.status(200).json({isAuth: 0});
  }
})

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/getData").post(getData);
router.route("/logout").post(logout);
router.route("/updateInfo").post(update);
router.route("/getAlbums").post(getAlbum);
router.route("/createAlbum").post(createAlbum);
module.exports = router;
