const mongoose = require("mongoose");

const getAudio = async (id) => {
  let gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "audios",
  });
  const file = await gfs.find({ _id: id }).toArray();
  return file[0];
};

const playAudio = async(req, res) => {
  let gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "audios",
  });
  const Objectid = mongoose.Types.ObjectId(req.params.audioTitle);
  getAudio(Objectid).then((file) => {
    if (!file && file.length === 0) {
      res.status(400).send("No file found");
    }
    const range = req.headers.range;
    if (range) {
      let size = file.length;
      let [start, end] = range.replace(/bytes=/, "").split("-");
      start = Number(start);
      end = end ? Number(end) : size - 1;

      if (!isNaN(start) && isNaN(end)) {
        end = size - 1;
      }
      if (isNaN(start) && !isNaN(end)) {
        start = size - end;
        end = size - 1;
      }
      if (start >= size || end >= size) {
        res.writeHead(416, {
          "Content-Range": `bytes */${size}`,
        });
        return res.end();
      }
      if(start === end) {
        return res.send();
      }
      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": end - start + 1,
        "Content-Type": "audio/mp3",
      });
      gfs
        .openDownloadStream(Objectid, {
          start: start,
          end: end,
        })
        .pipe(res);
    } else {
      return res.status(500).send("No ranges for headers");
    }
  });
}
module.exports.playAudio = playAudio;
