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

    // Creates a game
    // Gets { gameName, playerName } as payload
    socket.on('createGame', data => {
        const game = gamesManager.createGame(data.gameName, socket.id, data.playerName);
        socket.join(game.id);
        io.in(game.id).emit('update', { game: game.getContext() });
    });

    // Joins a game
    // Gets { gameId, gameName, playerName } as payload
    socket.on('joinGame', data => {
        const game = gamesManager.joinGame(data.gameId, socket.id, data.playerName)
        socket.join(game.id);
        io.in(game.id).emit('update', { game: game.getContext() });
    });

    // Lists games
    socket.on('listGames', () => socket.emit('listGames', { games: gamesManager.listGames() }));

    // Start the game
    // Gets { gameId } as payload
    socket.on('startGame', data => {
        const game = gamesManager.getGame(data.gameId);
        game.startGame();
        const updateStream = setInterval(() => {
            if (game.state.status === 'finished') {
                clearInterval(updateStream);
            }
            io.in(data.gameId).emit('update', { game: game.getContext() })
        }, 100);
    });
}



module.exports = events;