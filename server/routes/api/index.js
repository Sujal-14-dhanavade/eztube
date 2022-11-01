const Router = require("express").Router;
const router = Router();
const isEmailAvailable = require("../../controllers/api").isEmailAvailable;

router.route("/").get((req, res) => {
  res.status(200).json({started: true});
})

router.route("/isEmailAvailable/:email").get(isEmailAvailable);


module.exports = router;
