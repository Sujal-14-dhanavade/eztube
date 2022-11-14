const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
  playlistName: {
    type: String,
    required: true,
  },
  owner: { type: Schema.Types.ObjectId, required: true },
  date_created: {
    type: Date,
    default: Date.now,
  },
  playlistPic: { type: Schema.Types.ObjectId },
  songs: [{ type: Schema.Types.ObjectId }],
});

const Playlist = mongoose.model("playlist", playlistSchema);
module.exports = Playlist;
