import React from 'react'
import { useState } from 'react';

export default function Player({ name, symbol, active, onChangeName }) {

  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing(() => isEditing ? false : true);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleChange(e) {
    setPlayerName(e.target.value);
  }

  return (
    <li className={active}>
      <span className="player">
        {isEditing && <input type="text" value={playerName} onChange={handleChange}/>}
        {!isEditing && <span className='player-name'>{playerName}</span>}
        <span className='player-symbol'>{symbol}</span>
      </span>
      {isEditing && <button onClick={handleEditClick}>Save</button>}
      {!isEditing && <button onClick={handleEditClick}>Edit</button>}
    </li>
  );
}
