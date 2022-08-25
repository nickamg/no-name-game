import React, { useState } from "react";
import { LobbyClient } from 'boardgame.io/client';
import { HotPotato } from './Game';

export function Lobby(props) {
    const [gamesList, setGamesList] = useState([])
    const [numPlayers, setNumPlayers] = useState(2)
    const lobbyClient = new LobbyClient({ server: 'http://localhost:8000' });

    const listGames = async () => {
        const games = await lobbyClient.listMatches('HotPotato');
        setGamesList(games.matches.map(match => (<p key={match.matchID}>Match ID: {match.matchID}</p>)))
    }

    const createGame = async () => {
        const match = await lobbyClient.createMatch('HotPotato', {
            numPlayers: parseInt(numPlayers),
        });
        const player = await lobbyClient.joinMatch('HotPotato', match.matchID, {
            playerName: props.playerName
        })
        props.setMatchID(match.matchID);
        props.setPlayerID(player.playerID);
    }
    
    return (
        <div>
            Name: 
            <input 
                type="text" 
                name="playerName"
                value={props.playerName} 
                onChange={e => props.setPlayerName(e.target.value)} 
            />
            <br />
            Num Players: 
            <select 
                name="numPlayers"
                onChange={e => setNumPlayers(e.target.value)}
            >
                { (() => {
                    const totalPlayers = [];
                    for (let i = HotPotato.minPlayers; i <= HotPotato.maxPlayers; i++) {
                        totalPlayers.push(<option key={i}>{i}</option>);
                    }
                    return totalPlayers;
                })() }
            </select>
            <button onClick={createGame}>Create Game</button>
            <button onClick={listGames}>List Games</button>
            {gamesList}
        </div>
    )
}