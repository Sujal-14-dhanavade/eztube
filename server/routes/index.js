const express = require('express');
const insertUser = require("../controllers/Video/crud");


const router = express.Router();

router.route('/')
.get((req, res) => {
    res.send("express working");
})

router.route('/uploadVid')
.get((req, res) => {
    res.send("Hello");
})
.post((req, res) => {
    insertUser(req.body);
    res.send("done");
})

module.exports = router;