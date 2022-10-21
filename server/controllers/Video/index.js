const user = require("../../models/Video");
const insert = async (req) => {
    const userData = new user({
        name: req.name,
        password: req.password
    })
    await userData.save();
    console.log("inserted");
}
module.exports = insert;