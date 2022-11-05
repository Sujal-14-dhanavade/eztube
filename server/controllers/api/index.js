require("dotenv").config();
const User = require("../../models/User/index");
const Schema = require("mongoose").Schema;
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
        return res.status(200).json({_id : result._id});
      }
      
    });
  });
};

const registerUserPic = (req, res) => {
    const fileid = req.file.id;
    User.findOneAndUpdate({email: req.session.data.email}, {'$set': {userPic: fileid}}, (err, doc) => {
      if(err) {
        res.status(404).json(err);
      } else {
        req.session.data = {...req.session.data, userPic: fileid};
        res.redirect("/Ezport");
      }
    })
}
module.exports = { register, registerUserPic };
