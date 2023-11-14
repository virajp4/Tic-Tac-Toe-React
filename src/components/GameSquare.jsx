import React from 'react'

export default function GameSquare({ symbol }) {
    return (
        <div className="game-button">
            <h1>{symbol}</h1>
        </div>
    );
}
