require("dotenv").config();
const User = require("../../models/User/index");
const Album = require("../../models/Album");
const Song = require("../../models/Song");
const Schema = require("mongoose").Schema;
const Playlist = require("../../models/Playlist");
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
      recent_Played: req.session.data.recent_Played,
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

const getAlbum = (req, res) => {
  const { _id } = req.session.data;
  Album.find({ artist: _id }, { name: 1 }, (err, result) => {
    if (err) {
      res.status(200).json(err);
    } else {
      res.json(result);
    }
  });
};

const createAlbum = (req, res) => {
  const data = new Album({
    name: req.body.name,
    artist: req.session.data._id,
    albumPic: req.body.albumPic,
  });
  data.save((err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.status(200).json({ _id: result._id, name: result.name });
    }
  });
};

const registerSong = (req, res) => {
  const songData = new Song({
    name: req.body.name,
    song: req.body.song,
    songPic: req.body.songPic,
    owner: req.session.data._id,
    album: req.body.album,
    genre: req.body.genre,
    language: req.body.language,
    artist: req.body.artist,
    producer: req.body.producer,
    writer: req.body.writer,
  });
  songData.save((err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json({ _id: result._id });
    }
  });
};

const getSongs = (req, res) => {
  const owner = req.session.data._id;
  Song.find({ owner: owner }, (err, result) => {
    if (err) {
      res.status(200).json(err);
    } else {
      res.json(result);
    }
  });
};

const createPlaylist = (req, res) => {
  const data = new Playlist({
    playlistName: req.body.playListName,
    owner: req.session.data._id,
    playlistPic: req.body.playlistPic,
  });

  data.save((err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json({ error: false });
    }
  });
};

const getPlaylist = (req, res) => {
  const owner = req.session.data._id;
  Playlist.find({ owner: owner }, (err, result) => {
    if (err) {
      res.status(200).json(err);
    } else {
      res.json(result);
    }
  });
};

const addSongPlaylist = (req, res) => {
  Playlist.findById(req.body.id, (err, result) => {
    if (err) {
      res.json({ error: true });
    } else {
      if (!result.songs.includes(req.body.songid)) {
        const songs = [...result.songs, req.body.songid];
        Playlist.findByIdAndUpdate(
          req.body.id,
          { songs: songs },
          (err, result) => {
            if (err) {
              res.json({ error: true });
            } else {
              res.json({ error: false });
            }
          }
        );
      } else {
        res.json({ error: "included" });
      }
    }
  });
};

const getSongPlaylist = async (req, res) => {
  if (req.body.songs.length === 0) {
    res.json({ songs: false });
  } else {
    const songs = [];
    for (var i of req.body.songs) {
      let result = await Song.findById(i);
      songs.push(result);
    }
    res.json({ songs: songs });
  }
};

const likeSong = (req, res) => {
  const like_songs = req.session.data.liked_songs;
  const songId = req.body.songId;
  const method = req.params.method;
  if (method === "add") {
    User.findByIdAndUpdate(
      req.session.data._id,
      { liked_songs: [...like_songs, songId] },
      async (err, result) => {
        if (err) {
          res.json(err);
        } else {
          req.session.data = await User.findById(req.session.data._id);
          Song.findByIdAndUpdate(
            songId,
            { $inc: { likes: 1 } },
            (err, result) => {
              if (err) {
                res.json(err);
              } else {
                res.json({ liked: 1 });
              }
            }
          );
        }
      }
    );
  } else if (method === "remove") {
    const idx = like_songs.findIndex((ele) => ele === songId);
    like_songs.splice(idx, 1);
    User.findByIdAndUpdate(
      req.session.data._id,
      { liked_songs: like_songs },
      async (err, result) => {
        if (err) {
          res.json(err);
        } else {
          req.session.data = await User.findById(req.session.data._id);
          Song.findByIdAndUpdate(
            songId,
            { $inc: { likes: -1 } },
            (err, result) => {
              if (err) {
                res.json(err);
              } else {
                res.json({ liked: 0 });
              }
            }
          );
        }
      }
    );
  }
};

const viewSong = (req, res) => {
  const songId = req.body.songId;
  Song.findByIdAndUpdate(songId, { $inc: { views: 1 } }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json({ view: 1 });
    }
  });
};

const recentSong = (req, res) => {
  const songId = req.body.songId;
  const song = {
    song_id: songId,
    date: Date.now(),
  };
  const recentSong = req.session.data.recent_Played;
  recentSong.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA <= dateB) return false;
    else return true;
  });
  if (recentSong.findIndex((ele) => ele.song_id == songId) !== -1) {
    res.json({ success: 0 });
  } else {
    if (recentSong.length === 5) recentSong.splice(0, 1);
    const changedData = [...recentSong, song];
    User.findByIdAndUpdate(
      req.session.data._id,
      { $set: { recent_Played: changedData } },
      async (err, result) => {
        if (err) {
          res.json(err);
        } else {
          req.session.data = await User.findById(req.session.data._id);
          res.json({ success: 1 });
        }
      }
    );
  }
};

const topChart = async (req, res) => {
  const songData = await Song.find().sort({ views: -1 }).limit(5);
  res.json(songData);
};

const topUser = async (req, res) => {
  const userData = await User.find(
    {},
    { username: 1, country: 1, userPic: 1, verified: 1, followers: 1 }
  )
    .sort({ followers: -1 })
    .limit(4);
  res.json(userData);
};

const followUser = (req, res) => {
  const follow = req.session.data.follow;
  const userId = req.body.userId;
  const method = req.params.method;
  if (method === "add") {
    User.findByIdAndUpdate(
      req.session.data._id,
      { follow: [...follow, userId] },
      async (err, result) => {
        if (err) {
          res.json(err);
        } else {
          req.session.data = await User.findById(req.session.data._id);
          User.findByIdAndUpdate(
            userId,
            { $inc: { followers: 1 } },
            (err, result) => {
              if (err) {
                res.json(err);
              } else {
                res.json({ follow: 1 });
              }
            }
          );
        }
      }
    );
  } else if (method === "remove") {
    const idx = follow.findIndex((ele) => ele === userId);
    follow.splice(idx, 1);
    User.findByIdAndUpdate(
      req.session.data._id,
      { follow: follow },
      async (err, result) => {
        if (err) {
          res.json(err);
        } else {
          req.session.data = await User.findById(req.session.data._id);
          User.findByIdAndUpdate(
            userId,
            { $inc: { followers: -1 } },
            (err, result) => {
              if (err) {
                res.json(err);
              } else {
                res.json({ follow: 0 });
              }
            }
          );
        }
      }
    );
  }
};

const getUserSongs = (req, res) => {
  const userId = req.body.userId;
  Song.find({ owner: userId }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

const getFollow = async(req, res) => {
  const follow = req.session.data.follow;
  if (follow.length === 0) {
    res.json({ user: false });
  } else {
    const users = [];
    for (var i of follow) {
      let result = await User.findById(i, {
        username: 1,
        country: 1,
        userPic: 1,
        verified: 1,
        followers: 1,
      });
      users.push(result);
    }
    res.json({ user: users });
  }
};

const filterSearch = (req, res) => {
  const regEx = new RegExp(req.body.token.join("|"), "gi");
  const data = {songs: [], users: []};
  Song.find({name: {$regex: regEx}}, (err, result) => {
    if(err) {
      res.json(err);
    } else {
      data.songs = result;
      User.find({username: {$regex: regEx}}, { username: 1, country: 1, userPic: 1, verified: 1, followers: 1 },(err, result) => {
        if(err) {
          res.json(err);
        } else {
          data.users = result;
          res.json(data);
        }
      })
    }
  })
};
module.exports = {
  register,
  registerUserPic,
  login,
  getData,
  logout,
  update,
  getAlbum,
  createAlbum,
  registerSong,
  getSongs,
  createPlaylist,
  getPlaylist,
  addSongPlaylist,
  getSongPlaylist,
  likeSong,
  viewSong,
  recentSong,
  topChart,
  topUser,
  followUser,
  getUserSongs,
  getFollow,
  filterSearch
};
