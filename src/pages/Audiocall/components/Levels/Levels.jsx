import React, { useEffect } from 'react';
import LevelBtn from '../LevelBtn/LevelBtn';

// styles
import cl from './Levels.module.scss';

function Levels({ levels, changeLevel, state }) {
  useEffect(() => {
    if (state !== 'header') {
      const lvl = +localStorage.getItem('group-num');
      changeLevel(lvl);
    }
  }, [state]);

  return (
    <div className={cl.content}>
      <h2 className={cl.title}>Выбери свой уровень!</h2>
      <div className={cl['level-btns-container']}>
        {levels.map((level) => (
          <LevelBtn key={level} level={level} changeLevel={changeLevel} />
        ))}
      </div>
    </div>
  );
}

export default Levels;
