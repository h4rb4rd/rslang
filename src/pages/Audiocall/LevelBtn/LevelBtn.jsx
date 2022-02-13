import React from 'react';

// styles
import cl from './LevelBtn.module.scss';

function LevelBtn({ level, changeLevel }) {
  return (
    <div className={cl.level} onClick={() => changeLevel(level)}>
      {level}
    </div>
  );
}

export default LevelBtn;
