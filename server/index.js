const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000;
const app = next({});
const handle = app.getRequestHandler();

app.prepare().then( () => {
    
})
