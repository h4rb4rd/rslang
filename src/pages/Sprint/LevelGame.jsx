import React from 'react';

// styles
import cl from './Sprint.module.scss';

function LevelGame({ level, changeLevel }) {
  return (
    <div className={cl.level} onClick={() => changeLevel(level)}>
      {level}
    </div>
  );
}

export default LevelGame;
