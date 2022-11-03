const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historySchema= new Schema({
    song_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const userSchema = new Schema({
    userPic: {type: Schema.Types.ObjectId},
    username: {
        type: String,
        required: true,
        minLength: 8,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: Date,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    liked_songs: [{type: Schema.Types.ObjectId}],
    playlist: [{type: Schema.Types.ObjectId}],
    follow: [{type: Schema.Types.ObjectId}],
    followers: {
        type: Number,
        default: 0,
    },
    verified: {
        type: Boolean,
        default: false
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    recent_Played: {
        type: [historySchema]
    }
});

const User = mongoose.model("user", userSchema);
module.exports = User;