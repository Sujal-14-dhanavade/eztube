const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    songPic: {type: Schema.Types.ObjectId},
    artist: {type: Schema.Types.ObjectId, required: true},
    album: {type: Schema.Types.ObjectId, required: true},
    date_created: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0,
    },
    views: {
        type: Number,
        default: 0,
    }
});

const Song = mongoose.model("song", songSchema);
exports.default = Song;
