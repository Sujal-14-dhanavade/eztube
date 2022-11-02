const Router = require("express").Router;
const router = Router();
const isEmailAvailable = require("../../controllers/api").isEmailAvailable;
const register = require("../../controllers/api").register;

router.route("/").get((req, res) => {
  res.status(200).json({started: true});
})

router.route("/isEmailAvailable/:email").get(isEmailAvailable);

router.route("/register").post(register);

module.exports = router;
