require("dotenv").config();
const { GridFsStorage, crypto, path } = require("../../../library");

const storage = new GridFsStorage({
  url: process.env.DATABASE,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "albumAvatar",
        };
        resolve(fileInfo);
      });
    });
  },
});

module.exports = storage;
