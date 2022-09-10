
const Game = require('./game.js');

/**
 * @class GamesManager
 * @classdesc Stores, creates, modifies, lists and deletes games.
 */
function GamesManager() {
    /**
     * List of games.
     * @type {Map<String, Game>}
     */
    this.gamesList = new Map();

    /**
     * Searchs the Game based on the Game ID and returns it.
     * @param {string} gameId - Game's ID.
     * @returns {Game} The Game instance matching the Game ID.
     */
    this.getGame = (gameId) => this.gamesList.get(gameId);

    /**
     * Creates a new Game instance and adds it to the Game's List.
     * @param {string} gameName - Game's name.
     * @param {string} playerId - Player's ID.
     * @param {string} playerName - Player's name.
     * @returns {Game} The newly created Game instance.
     */
    this.createGame = (gameName, playerId, playerName) => {
        const game = new Game(gameName);
        game.addPlayer(playerId, playerName);
        this.gamesList.set(game.id, game);
        return game;
    }

    /**
     * Joins the specified Game by its ID.
     * @param {string} gameId - Game's ID.
     * @param {string} playerId - Player's ID.
     * @param {string} playerName - Player's name.
     * @returns {Game} The newly created Game instance.
     */
    this.joinGame = (gameId, playerId, playerName) => {
        const game = this.gamesList.get(gameId);
        game.addPlayer(playerId, playerName);
        return game;
    }

    /**
     * Lists all the ready to start games.
     * @returns {import('./game.js').CardData} The list of games that are waiting to start and are missing players.
     */
    this.listGames = () => Array.from(this.gamesList.values(), game => {
        if (game.gameIsListable()) {
            return game.getCardData();
        }
    });
}

module.exports = GamesManager;