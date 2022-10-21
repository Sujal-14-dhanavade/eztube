const Router = require("express").Router;
const router = Router();

router.route("/").get((req, res) => {
  res.send("express working");
});


module.exports = router;
