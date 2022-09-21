const express = require('express');
const next = require('next');
const homeRoute = require('./routes/home');

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000;
const app = next({dir: ".", dev});
const handle = app.getRequestHandler();

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
