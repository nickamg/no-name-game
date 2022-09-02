import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

function App() {
  const [playerName, setPlayerName] = useState('Player Name');
  const [gameName, setGameName] = useState('Game Name');
  const [gamesList, setGamesList] = useState(new Map())

  useEffect(() => {
    socket.on('listGames', data => {
      setGamesList(new Map(data.games));
    })

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('listGames');
    };
  }, []);

  const createGame = () => socket.emit('createGame', { gameName, playerName });
  const joinGame = e => socket.emit('joinGame', { gameName: e.target.value , playerName })
  const listGames = () => socket.emit('listGames')

  return (
    <div>
      <input type='text' id='player-name' name='player-name' onChange={e => setPlayerName(e.target.value) } value={ playerName } />
      <input type='text' id='game-name' name='game-name' onChange={e => setGameName(e.target.value) } value={ gameName } />
      <button onClick={ createGame }>Create Game</button>
      <button onClick={ listGames }>List Games</button>
      {Array.from(gamesList).map(([currGame, data]) => (
        <div>
          { currGame } { data.players.map(player => player.name) }
          <button onClick={ joinGame } value={ currGame }>Join Game</button>
        </div>
      ))}
    </div>
  );
}

export default App;