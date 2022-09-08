/**
 * @typedef {import('./gamesManager.js')} GamesManager
 */

/**
 * List of events
 * @param {Object} io 
 * @param {Object} socket 
 * @param {GamesManager} gamesManager 
 */
function events(io, socket, gamesManager) {

    socket.on('disconnect', () => console.log('User disconnected'));

    socket.on('createGame', data => {
        const game = gamesManager.createGame(data.gameName, socket.id, data.playerName);
        socket.join(game.id);
        io.in(game.id).emit('update', { game: game.getContext() });
    });

    socket.on('joinGame', data => {
        const game = gamesManager.joinGame(data.gameId, socket.id, data.playerName)
        socket.join(game.id);
        io.in(game.id).emit('update', { game: game.getContext() });
    });

    socket.on('listGames', () => socket.emit('listGames', { games: gamesManager.listGames() }));
}



module.exports = events;