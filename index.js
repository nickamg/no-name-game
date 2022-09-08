const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const gamesManager = new (require('./gamesManager'))();
const events = require('./events');

app.use(express.static(__dirname + '/frontend/build'))

app.get('/', (res) => {
  res.sendFile(__dirname + '/frontend/build/index.html');
});

io.on('connection', (socket) => {
  events(io, socket, gamesManager);
});

server.listen(8000, () => {
  console.log('listening on *:8000');
});