import React from 'react';

// styles
import cl from './Sprint.module.scss';

function LevelGame({ level, changeLevel }) {
  return (
    <div className={cl.level} onClick={() => changeLevel(level - 1)}>
      {level}
    </div>
  );
}

export default LevelGame;
