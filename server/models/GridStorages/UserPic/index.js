require("dotenv").config();
const { crypto, path } = require("../../../library");

const storage = {
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
          bucketName: "userAvatar",
        };
        resolve(fileInfo);
      });
    });
  },
};

module.exports = storage;
