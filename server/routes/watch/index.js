const Router = require("express").Router;
const playAudio = require("../../controllers/Audio").playAudio;
const router = Router();

router.get("/:audioTitle", playAudio);

module.exports = router;