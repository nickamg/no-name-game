import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import GameBoard from './gameBoard';

const socket = io();

function App() {
  const [playerName, setPlayerName] = useState('Player Name');
  const [gameName, setGameName] = useState('Game Name');
  const [game, setGame] = useState(null);
  const [gamesList, setGamesList] = useState(null)

  useEffect(() => {
    socket.on('listGames', data => {
      setGamesList(data.games);
    })

    socket.on('update', data => {
      data.game.players = new Map(data.game.players);
      setGame(data.game);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('listGames');
    };
  }, []);

  const createGame = () => socket.emit('createGame', { gameName, playerName });
  const joinGame = e => socket.emit('joinGame', { gameId: e.target.value, gameName, playerName });
  const listGames = () => socket.emit('listGames')
  const startGame = () => socket.emit('startGame', { gameId: game.id })

  if (game) {
    return (
      <div>
        <GameBoard game={ game } startGame={ startGame }/>
      </div>
    )
  } else {
    return (
      <div>
        <input type='text' id='player-name' name='player-name' onChange={e => setPlayerName(e.target.value) } value={ playerName } />
        <input type='text' id='game-name' name='game-name' onChange={e => setGameName(e.target.value) } value={ gameName } />
        <button onClick={ createGame }>Create Game</button>
        <button onClick={ listGames }>List Games</button>
        { gamesList ? gamesList.map(game => (
          <div>
            { game.name } { () => game.players.map(player => (<p>{ player }</p>)) }
            <button onClick={ joinGame } value={ game.id }>Join Game</button>
          </div>
        )) : ''}
      </div>
    );
  }
}

export default App;