const crypto = require('crypto');

/**
 * @class Game
 * @classdesc Represents a Game.
 * @param {string} name - Name to identify the Game.
 */
function Game(name) {
    /**
     * Game's ID
     * @type {string}
     */
    this.id = crypto.randomUUID();
    
    /**
     * Game's name
     * @type {string}
     */
    this.name = name || 'Hot Potato'
    
    /**
     * Represents the Game's state
     * @type {State}
     */
    this.state = {
        status: 'waiting',  // waiting, inProgress, finished
        players: new Map(),
    }

    /**
     * 
     * @type {Object}
     */
    this.moves = {
        /**
         * Passes the potato to the next random Player.
         * @function passThePotato
         */
        passThePotato: () => {
            this.nextTurn(true);
        }
    }
    
    /**
     * Game's minimum number of Players.
     * @type {number}
     */
    this.minPlayers = 2

    /**
     * Game's maximum number of Players. Could be null.
     * @type {?number}
     */
    this.maxPlayers = null;

    /**
     * Adds a player to the Game's players Map.
     * @param {string} playerId - New Player's ID.
     * @param {string} playerName - New Player's name.
     */
    this.addPlayer = (playerId, playerName) => this.state.players.set(playerId, { 
        id: playerId, 
        name: playerName, 
        isActive: false, 
        points: 0 
    });

    /**
     * Retrieves the information necessary to show a card when listing games.
     * @returns {CardData} The data necessary to show the Game's card when listing games.
     */
    this.getCardData = () => {
        const cardData = {};
        cardData.id = this.id;
        cardData.name = this.name;
        cardData.players = Array.from(this.state.players.values(), player => player.name);
        return cardData;
    }
    
    /**
     * Sends only the data the client needs to play and discards any information 
     * that should be hidden to the client.
     * @returns {Game} The Game's necessary data for the client to play.
     */
    this.getContext = () => {
        const game = {}
        game.id = this.id;
        game.name = this.name;
        game.status = this.state.status;
        game.players = Array.from(this.state.players);
        console.dir(game, { depth: null });
        return game;
    }

    /**
     * Sets the Game's status to 'inProgress' and activates a Player at random.
     */
    this.startGame = ()  => {
        if (this.gameIsReady()) {
            this.state.status = 'inProgress';
            this.state.players.set(this.state.players.keys()[Math.floor(Math.random() * this.state.players.size)], { ...this.state.players, isActive: true });
            
            const counter = setInterval(() => {
                this.getActivePlayer().points++;
            }, 100);

            setTimeout(() => {
                clearInterval(counter);
            }, Math.floor(((Math.random() * 30) + 5) * 1000));
        }
    }

    /**
     * Checks wether the game is ready to start or not.
     * @returns {boolean} True if the game meets all the requirements to be started. Otherwise it will return false.
     */
    this.gameIsReady = () => !!(
        this.state.players.size >= this.minPlayers 
        && (!this.maxPlayers || this.state.players.size <= this.maxPlayers) 
    );

    /**
     * Checks wether the game can be accessed and therefore be listable.
     * @returns {boolean} True if the game can still be accessed. Otherwise it will return false.
     */
    this.gameIsListable = () => !!(
        this.state.status === 'waiting'
        && (!this.maxPlayers || this.state.players.size < this.maxPlayers)
    );

    /**
     * Gets the active player.
     * @returns {Player} The active Player object.
     */
    this.getActivePlayer = () => {
        for (const [, player] of this.state.players) {
            if (player.isActive) {
                return player;
            }
        }
    }

    /**
     * Adds one to the current player number to select the next player.
     * @returns {number} The next player's number in order.
     */
    this.getNextNumber = () => {
        let currNumber = this.getActivePlayer().number;
        if (currNumber === (this.state.players.size - 1)) {
            return 0;
        } else {
            return currNumber++;
        }
    }

    /**
     * Passes the current turn by deactivating the currently playing Player and activating the next one.
     * @param {boolean} random - Indicates if the next player should be selected at random or not.
     */
    this.nextTurn = (random) => {
        const activePlayer = this.getActivePlayer();
        activePlayer.isActive = false;
        if (random) {
            const eligiblePlayers = new Map(this.state.players);
            eligiblePlayers.delete(activePlayer.id);
            const selectedPlayer = Array.from(eligiblePlayers.keys()[Math.floor(Math.random() * eligiblePlayers.players.size)]);
            this.state.players.set(selectedPlayer, { ...this.state.players.get(selectedPlayer), isActive: true });
        } else {
            const nextNumber = this.getNextNumber();
            for (const [, player] of this.state.players) {
                if (player.number === nextNumber) {
                    player.isActive = true;
                }
            }
        }
    }
}

/**
 * @typedef CardData
 * @prop {string} id - Game's ID
 * @prop {string} name - Game's name
 * @prop {string[]} players - Players' names.
 */

/**
 * Representation of a Player
 * @typedef Player
 * @prop {string} id - Player's ID.
 * @prop {string} name - Player's name.
 * @prop {number} number - Player's number.
 * @prop {boolean} isActive - Player's ability to play.
 * @prop {number} points - Player's points.
 */

/**
 * State for a Game
 * @typedef State
 * @prop {('waiting'|'inProgress'|'finished')} status - The Game's status ['waiting' | 'inProgress' | 'finished'].
 * @prop {Map<string, Player>} players - Map of players, each key being the Player's ID.
 */

module.exports = Game;