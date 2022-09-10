import React from 'react';

function GameBoard(props) {
    const getPlayers = () => Array.from(props.game.players.values());

    if (props.game.status === 'waiting') {
        return (
            <div>
                Waiting to start
                <br/>
                Players:
                <ul>
                    { getPlayers().map(player => (<li>{ player.name }</li>)) }
                </ul>
                <button onClick={ props.startGame }>START GAME</button>
            </div>
        )
    } else if (props.game.status === 'inProgress') {
        return (
            <div>
                Game has started!!
                Players:
                <ul>
                    { getPlayers().map(player => (<li>{ player.name } - { player.points }</li>)) }
                </ul>
            </div>
        )
    } else if (props.game.status === 'finished') {
        return (
            <div>
                Game has finished!!
                Players:
                <ul>
                    { getPlayers().map(player => (<li>{ player.name } - { player.points }</li>)) }
                </ul>
            </div>
        )
    }
}

export default GameBoard;