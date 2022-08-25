const { Server, Origins } = require('boardgame.io/server');
const { HotPotato } = require('./Game');

const server = Server({
  games: [HotPotato],
  origins: [Origins.LOCALHOST]
});

server.run(8000);