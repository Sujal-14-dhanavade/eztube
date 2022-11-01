const User = require("../../models/User/index");
const mongoose = require("mongoose");


const isEmailAvailable = (req, res) => {
    const input_Email = req.params.email;
    User.find({email: input_Email}, (err, docs) => {
        if(err){
            res.status(500).json({error: true});
        } else {
            if (docs.length === 0) {
                res.status(200).json({available: true});
            } else {
                res.status(200).json({available: false});
            }
        }
    })
}

module.exports = {isEmailAvailable};