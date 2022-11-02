require("dotenv").config();
const User = require("../../models/User/index");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const isEmailAvailable = (req, res) => {
  const input_Email = req.params.email;
  User.find({ email: input_Email }, (err, docs) => {
    if (err) {
      res.status(500).json({ error: true });
    } else {
      if (docs.length === 0) {
        res.status(200).json({ available: true });
      } else {
        res.status(200).json({ available: false });
      }
    }
  });
};

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
    userData.save((err) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Registered");
      }
      
    });
  });
};
module.exports = { isEmailAvailable, register };
