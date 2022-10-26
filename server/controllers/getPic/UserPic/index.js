const mongoose = require("mongoose");

const getUser = async (id) => {
  let gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "userAvatar",
  });
  const file = await gfs.find({ _id: id }).toArray();
  return file[0];
};

const streamUserAvatar = (req, res) => {
  let gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "userAvatar",
  });
  const Objectid = mongoose.Types.ObjectId(req.params.userPic);
  getUser(Objectid).then((file) => {
    if (!file && file.length === 0) {
      res.status(400).send("No file found");
    }

    gfs.openDownloadStream(Objectid).pipe(res);
  });
};
module.exports.getUserPic = streamUserAvatar;
