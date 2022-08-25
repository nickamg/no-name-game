export const HotPotato = {
    name: 'HotPotato',
    minPlayers: 2,
    maxPlayers: 4,

    setup: (ctx) => ({
        turnStart: 0,
        explodeDate: new Date().getTime() + (Math.floor((Math.random() * 60 + 2)) * 1000),
        playersData: (() => {
            const playersData = {}
            for (let i = 0; i < ctx.numPlayers; i++) {
                playersData['player-' + i] = { 
                    player: i,
                    points: 0 
                };
            }
            return playersData;
        })()
    }),

    turn: {
        // Set the moment the turn began
        onBegin: (G) => {
            G.turnStart = new Date().getTime()
        },
        // Calculate the time that passed between start and end
        // and set it as the score
        onEnd: (G, ctx) =>{
            G.playersData['player-' + ctx.currentPlayer].points = new Date.getTime() - G.turnStart / 100
        }
    },

    moves: {
        explodedPotato: (G, ctx) => {
            G.playersData['p' + ctx.currentPlayer].points = 0;
            ctx.events.endTurn();
        },
        passPotato: (G, ctx) => {
            G.passedTime = new Date().getTime();
            ctx.events.endTurn();
        }
    },

    endIf: (G, ctx) => {
        if (new Date().getTime() >= G.timeToExplode) {
            return { loser: ctx.currentPlayer + ' exploded the potato' }
        }
    }
}