const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const albumSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    artist: {type: Schema.Types.ObjectId, required: true},
    albumPic: {type: Schema.Types.ObjectId},
    date_created: {
        type: Date,
        default: Date.now
    }
});

const Album = mongoose.model("album", albumSchema);
module.exports = Album;
