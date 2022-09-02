const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const games = require('./games.js');

app.use(express.static(__dirname + '/frontend/build'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/build/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('ping', () => socket.emit('pong'));
  socket.on('disconnect', () => console.log('User disconnected'));
  socket.on('createGame', data => {
    socket.join(data.gameName);
    games.createGame(data.gameName, data.playerName, socket.id);
  });
  socket.on('joinGame', data => {
    games.joinGame(data.gameName, data.playerName, socket.id)
    io.to(data.gameName).emit('updateGame')
  });
  socket.on('listGames', () => socket.emit('listGames', { games: Array.from(games.listGames()) }));
});

server.listen(8000, () => {
  console.log('listening on *:8000');
});