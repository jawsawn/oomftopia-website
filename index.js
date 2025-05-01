const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // serve game client

// Routes
app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname + "/public/index" });
});
app.get('/game', function (req, res) {
    res.sendFile('game.html', { root: __dirname + "/public/game" });
});
app.get('/j', function (req, res) {
    res.sendFile('j.html', { root: __dirname + "/public/j" });
});

// Sockets for /game
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    console.log('Current users:', io.engine.clientsCount);
    io.emit('user count', io.engine.clientsCount);

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        console.log('Current users:', io.engine.clientsCount);
        io.emit('user count', io.engine.clientsCount);
    });
});



server.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
});