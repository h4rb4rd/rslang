import React, { useEffect } from 'react';
import LevelGame from './LevelGame';

// styles
import cl from './Sprint.module.scss';

function LevelsGame({ levels, changeLevel, state }) {
  useEffect(() => {
    console.log(state);
    if (state !== 'header') {
      const lvl = +localStorage.getItem('group-num');
      changeLevel(lvl);
      console.log('lvls');
    }
  }, [state]);

  return (
    <div className={cl.lvlWrapper}>
      {levels.map((item) => (
        <LevelGame key={item} level={item} changeLevel={changeLevel} />
      ))}
    </div>
  );
}

export default LevelsGame;
