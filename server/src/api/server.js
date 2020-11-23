const express = require('express');

// Routers

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.json({ api: "Up & running!"});
});

module.exports = server;