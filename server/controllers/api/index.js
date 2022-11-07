require("dotenv").config();
const User = require("../../models/User/index");
const bcrypt = require("bcrypt");

const register = (req, res) => {
  const data = req.body;
  bcrypt.hash(data.password, Number(process.env.ROUND)).then((hash) => {
    const userData = new User({
      username: data.username,
      password: hash,
      email: data.email,
      dob: data.dob,
      country: data.country,
    });
    userData.save((err, result) => {
      if (err) {
        return res.send(err);
      } else {
        req.session.data = result;
        req.session.isAuth = true;
        return res.status(200).json({ _id: result._id });
      }
    });
  });
};

const registerUserPic = (req, res) => {
  const fileid = req.file.id;
  User.findOneAndUpdate(
    { email: req.session.data.email },
    { $set: { userPic: fileid } },
    (err, doc) => {
      if (err) {
        res.status(404).json(err);
      } else {
        req.session.data = { ...req.session.data, userPic: fileid };
        res.redirect("/Ezport");
      }
    }
  );
};

const login = (req, res) => {
  User.findOne({ username: req.body.username }, (err, docs) => {
    if (docs) {
      bcrypt.compare(req.body.password, docs.password, (err, result) => {
        if (result === true) {
          req.session.data = docs;
          req.session.isAuth = true;
          return res.status(200).json({ isAuth: 1 });
        } else {
          return res.status(200).json({ isAuth: 0 });
        }
      });
    } else {
      if (docs === {}) {
        return res.status(200).json({ isAuth: 0 });
      } else {
        return res.status(200).json({ error: 1 });
      }
    }
  });
};

const getData = (req, res) => {
  if (req.session.isAuth) {
    res.status(200).json({
      _id: req.session.data._id,
      username: req.session.data.username,
      email: req.session.data.email,
      dob: req.session.data.dob,
      country: req.session.data.country,
      liked_songs: req.session.data.liked_songs,
      playlist: req.session.data.playlist,
      follow: req.session.data.follow,
      followers: req.session.data.followers,
      verified: req.session.data.verified,
      userPic: req.session.data.userPic,
      recent_played: req.session.recent_played,
    });
  } else {
    res.status(200).json({
      _id: null,
    });
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.json({ logout: 1 });
};

const update = (req, res) => {
  const data = req.body;
  User.findByIdAndUpdate(
    req.body._id,
    {
      $set: {
        username: data.username,
        email: data.email,
        dob: data.dob,
        country: data.country,
      },
    },
    (err, result) => {
      if (err) {
        res.status(200).json(err);
      } else {
        req.session.data = req.body;
        res.json({ update: 1 });
      }
    }
  );
};
module.exports = { register, registerUserPic, login, getData, logout, update };
