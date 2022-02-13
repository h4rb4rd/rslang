import React from 'react';

// styles
import cl from './LevelBtn.module.scss';

function LevelBtn({ level, changeLevel }) {
  return (
    <button className={cl['level-btn']} onClick={() => changeLevel(level - 1)}>
      {level}
    </button>
  );
}

export default LevelBtn;
