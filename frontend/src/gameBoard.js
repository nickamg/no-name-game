import React from 'react';

function GameBoard(props) {
    const getPlayerNames = () => Array.from(props.game.players.values(), player => player.name);

    if (props.game.status === 'waiting') {
        return (
            <div>
                Waiting to start
                <button onClick={ props.startGame }>START GAME</button>
            </div>
        )
    } else if (props.game.status === 'inProgress') {
        return (
            <div>
                Game has started!!
                Players:
                <ul>
                    { getPlayerNames().map(name => (<li>{ name }</li>)) }
                </ul>
            </div>
        )
    }
}

export default GameBoard;