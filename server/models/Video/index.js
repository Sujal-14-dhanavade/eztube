const mongooseSchema = require("mongoose").Schema;
const mongooseModel = require("mongoose").Model

const userSchema = mongooseSchema({
    name: String,
    password: String
})

const User = mongooseModel("user", userSchema);

module.exports = User;


