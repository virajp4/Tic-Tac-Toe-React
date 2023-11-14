import React from 'react'
import { useState } from 'react';

import { WINNING_COMBINATIONS } from './WINNING_COMBINATIONS.js'
import Header from './components/Header'
import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log'
import GameOver from './components/GameOver.jsx';

function App() {

  const INITIAL_NAMES = {
    X: 'Player 1',
    O: 'Player 2'
  };

  const INITIAL_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  const [board, setBoard] = useState(INITIAL_BOARD);
  const [turns, setTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState(INITIAL_NAMES);

  const currentPlayer = getCurrentPlayer();

  const draw = turns.length === 9;
  let winner = null;

  function handlePlayerNameChange(symbol, newName) {
    setPlayerNames(prevPlayerNames => {
      return {
        ...prevPlayerNames,
        [symbol]: newName
      };
    });
  }

  function getCurrentPlayer() {
    if (turns.length > 0 && turns[0].player === 'X') {
      return 'O';
    }
    return 'X';
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setTurns((prevTurns) => {
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];
      return updatedTurns;
    });

    setBoard((prevBoard) => {
      const updatedBoard = [...prevBoard];
      updatedBoard[rowIndex][colIndex] = currentPlayer;
      return updatedBoard;
    });
  }

  function reset() {
    setBoard(INITIAL_BOARD);
    setTurns([]);
  }

  for (const combination of WINNING_COMBINATIONS) {
    const Square1 = board[combination[0].row][combination[0].column];
    const Square2 = board[combination[1].row][combination[1].column];
    const Square3 = board[combination[2].row][combination[2].column];

    if (Square1 && Square1 === Square2 && Square1 === Square3) {
      winner = playerNames[Square1];
    }
  }

  return (
    <main>
      <Header />
      <div className='mainbox'>
        <div id="game-container">
          <ol id='players' className='highlight-player'>

            <Player
              name='Player 1'
              symbol='X'
              active={currentPlayer == 'X' ? 'active' : 'None'}
              onChangeName={handlePlayerNameChange}
            />

            <Player
              name='Player 2'
              symbol='O'
              active={currentPlayer == 'O' ? 'active' : 'None'}
              onChangeName={handlePlayerNameChange}
            />

          </ol>
          <GameBoard board={board} handlerFunction={(rowIndex, colIndex) => handleSelectSquare(rowIndex, colIndex)} />
          {(winner || draw) && <GameOver winner={winner} resetFunc={reset} />}
        </div>
        <div className="logbox">
          <h1>Move History</h1>
          <Log turns={turns} />
        </div>
      </div>
    </main>
  );
}

export default App
