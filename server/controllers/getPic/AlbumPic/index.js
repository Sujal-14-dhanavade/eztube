const mongoose = require("mongoose");

const getAlbum = async (id) => {
  let gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "albumAvatar",
  });
  const file = await gfs.find({ _id: id }).toArray();
  return file[0];
};

const streamAlbumPic = (req, res) => {
  let gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "albumAvatar",
  });
  const Objectid = mongoose.Types.ObjectId(req.params.albumPic);
  getAlbum(Objectid).then((file) => {
    if (!file && file.length === 0) {
      res.status(400).send("No file found");
    }
    gfs.openDownloadStream(Objectid).pipe(res);
  });
}
module.exports.getAlbumPic = streamAlbumPic;
