const mongoose = require("mongoose");

const getSong = async (id) => {
  let gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "songAvatar",
  });
  const file = await gfs.find({ _id: id }).toArray();
  
  return file[0];
};

const streamSongAvatar = (req, res) => {
  let gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "songAvatar",
  });
  const Objectid = mongoose.Types.ObjectId(req.params.songPic);
  getSong(Objectid).then((file) => {
    if (!file && file.length === 0) {
      res.status(400).send("No file found");
    }
    gfs.openDownloadStream(Objectid).pipe(res);
  });
}
module.exports.getSongPic = streamSongAvatar;
