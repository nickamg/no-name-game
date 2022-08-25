import React, { useState, useEffect } from 'react';

export function HotPotatoBoard({ G, ctx, moves, isActive }) {
  const duplicatePoints = () => {
    const points = {}
    for (const player in G.playersData) {
      points[player] = {
        player: G.playersData[player].player,
        points: G.playersData[player].points
      }
    }
    return points;
  };

  const [points, setPoints] = useState(duplicatePoints())
  const onClick = () => moves.passPotato(G, ctx);

  // useEffect(() => {
  //   const counterInterval = setInterval((points, setPoints, G, ctx, moves) => {
  //     if (new Date().getTime() < G.explodeDate) {
  //       setPoints(points['player-' + ctx.currentPlayer].points += 10);
  //       console.log(points)
  //     } else {
  //       console.log('entered here')
  //       moves.explodedPotato(G, ctx);
  //     }
  //   }, 1000, points, setPoints, G, ctx, moves);

  //   return () => {
  //     clearInterval(counterInterval);
  //   }
  // }, [points, setPoints, G, ctx, moves]);

  let winner = '';
  let renderPoints = 0

  if (ctx.gameover) {
    winner =
      ctx.gameover.loser !== undefined ? (
        <div id="loser">Loser: {ctx.gameover.loser}</div>
      ) : (
        <div id="loser">Draw!</div>
      );
  } else {
    renderPoints = (() => {
      const pointsList = []
      for (const player in points) {
        pointsList.push(
          <div key={player.player}>
            <p>Points: {player.points}</p>
          </div>
        )
      }
      return pointsList;
    })()
  }

  return (
    <div>
      {renderPoints}
      <button onClick={onClick}>Pass turn</button>
      {winner}
    </div>
  );
}