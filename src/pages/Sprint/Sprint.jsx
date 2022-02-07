import React, { useState } from 'react';
import LevelGame from './LevelGame';

// styles
import cl from './Sprint.module.scss';
import SprintGame from './SprintGame';

function Sprint() {
  const [level, setLevel] = useState(0);

  const levels = [1, 2, 3, 4, 5, 6];

  const changeLevel = (lvl) => {
    setLevel(lvl);
    console.log(lvl);
  };

  return (
    <div className={cl.sprint}>
      {!level ? (
        <div className={cl.lvlWrapper}>
          {levels.map((item) => (
            <LevelGame key={item} level={item} changeLevel={changeLevel} />
          ))}
        </div>
      ) : (
        <SprintGame level={level} />
      )}
    </div>
  );
}

export default Sprint;
