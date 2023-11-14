import React from 'react'

export default function GameBoard({ board, handlerFunction }) {

    return (
        <ol id='game-board'>
            {board.map((row, rowIndex) => <ol key={rowIndex}>
                {row.map((col, colIndex) => <li key={colIndex} className='board-col'>
                    <button id='game-button' onClick={() => handlerFunction(rowIndex, colIndex)} disabled={col !== null}>{col}</button>
                </li>)}
            </ol>)}
        </ol>
    );
}
