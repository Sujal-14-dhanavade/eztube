const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const videoSchema = new Schema({
    video_title: {
        type: String,
        required: true
    },
    video_time: {
        type: Number,
        required: true
    },
    video_view: {
        type: Number,
        required: true,
        default: 0
    },
    video_like: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = videoSchema;
