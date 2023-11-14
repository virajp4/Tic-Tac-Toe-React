import React from 'react'

export default function GameOver({ winner, resetFunc }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner && <p>{winner} Wins!</p>}
      {!winner && <p>It's a Draw!</p>}
      <button onClick={resetFunc}>Play Again</button>
    </div>
  )
}
