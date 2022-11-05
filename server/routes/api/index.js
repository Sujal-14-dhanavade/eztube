const Router = require("express").Router;
const router = Router();
const register = require("../../controllers/api").register;

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

router.route("/register").post(register);

module.exports = router;
