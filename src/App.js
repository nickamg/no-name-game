import React, { useState } from "react";
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { HotPotato } from './Game';
import { HotPotatoBoard } from './Board';
import { Lobby } from "./Lobby";

const HotPotatoClient = Client({
  game: HotPotato,
  board: HotPotatoBoard,
  multiplayer: SocketIO({ server: 'localhost:8000' }),
});

const App = () => {
  const [playerName, setPlayerName] = useState('Player');
  const [playerID, setPlayerID] = useState(0)
  const [matchID, setMatchID] = useState(undefined)

  // if not in lobby
  // if in lobby
  // if in game
  // if left game

  if (matchID) {
    return (
      <div>
        <HotPotatoClient playerID='0' />
      </div>
    )
  } else {
    return (
      <div>
        <Lobby
          playerName={playerName}
          setPlayerName={setPlayerName}
          playerID={playerID}
          setPlayerID={setPlayerID}
          matchID={matchID}
          setMatchID={setMatchID}
        />
      </div>
    )
  }
} 

export default App;