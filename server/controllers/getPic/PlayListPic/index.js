const mongoose = require("mongoose");

const getPlaylist = async (id) => {
  let gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "playlistAvatar",
  });
  const file = await gfs.find({ _id: id }).toArray();
  return file[0];
};

const streamPlaylistPic = (req, res) => {
  let gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "playlistAvatar",
  });
  const Objectid = mongoose.Types.ObjectId(req.params.playlistPic);
  getPlaylist(Objectid).then((file) => {
    if (!file && file.length === 0) {
      res.status(400).send("No file found");
    }
    gfs.openDownloadStream(Objectid).pipe(res);
  });
}
module.exports.getPlaylistPic = streamPlaylistPic;
