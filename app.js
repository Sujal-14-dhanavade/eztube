const express = require("express");
const _ = require("lodash");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.route("/")
    .get((req, res) => {
        res.send("Hello World");
    })

app.listen(port, (req, res) => {
    console.log("Server started");
})