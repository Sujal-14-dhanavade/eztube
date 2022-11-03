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
        return res.status(200).json({_id : result._id});
      }
      
    });
  });
};
module.exports = { register };
