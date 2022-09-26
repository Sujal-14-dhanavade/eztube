const express = require('express');
const mongoose = require("mongoose");
const videoSchema = require("../models/videoModel");


const router = express.Router();

const video = mongoose.model("video",videoSchema )
router.route('/')
.get((req, res) => {
    const data = new video(
        {
            video_title: "Time to see",
            video_time:24000,
        }
    )
    data.save().then(()=> {
        console.log("Saved")
    });
})

module.exports = router;