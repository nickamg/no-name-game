function Games() {
    this.gamesList = new Map();
    this.minPlayers = 2;
    this.maxPlayers = 4;

    this.createGame = (gameName, playerName, playerId) => {
        if (!this.gamesList.has(gameName)) {
            this.gamesList.set(gameName, { players: [{ id: playerId, name: playerName, number: 0 }]});
            return true;
        } else {
            return false;
        }
    }

    this.joinGame = (gameName, playerName, playerId) => {
        if (this.gamesList.get(gameName).players.length <= this.maxPlayers) {
            this.gamesList.get(gameName).players =  [ ...this.gamesList.get(gameName).players, { id: playerId, name: playerName, number: this.gamesList.get(gameName).players.length }];
        }
    }

    this.listGames = () => this.gamesList;
}

module.exports = new Games();