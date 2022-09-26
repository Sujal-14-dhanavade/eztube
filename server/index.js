require('dotenv').config();
// requiring modules

const express = require('express');
const next = require('next');
const homeRoute = require('./routes/home');
const mongoose = require('mongoose');

// connecting to database
const database = "mongodb+srv://surojeet:" + process.env.ATLAS_PASSWORD +"@cluster0.qhibn.mongodb.net/EzTube?retryWrites=true&w=majority";
mongoose.connect(database)
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.log(err);
    });



// starting development mode
const dev = process.env.NODE_ENV !== 'production'
// selecting port
const port = process.env.PORT || 3000;
// next app
const app = next({dir: ".", dev});
// handler to handle all requests
const handle = app.getRequestHandler();




// preparing next app to connect to express server as backend
app.prepare().then( () => {
    const server = express();
    server.use("/api", homeRoute);
    server.get("*", (req, res) => {
        return handle(req, res);
    });
    server.listen(port, () => {
        console.log("Server Started");
    })
})
