const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    song: {type: Schema.Types.ObjectId, required: true},
    songPic: {type: Schema.Types.ObjectId, required: true},
    owner: {type: Schema.Types.ObjectId, required: true},
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
    },
    genre: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    artist: {
        type: [String],
        required: true
    },
    producer: {
        type: [String],
        required: true 
    },
    writer: {
        type: [String],
        required: true
    }
});

const Song = mongoose.model("song", songSchema);
module.exports = Song;
