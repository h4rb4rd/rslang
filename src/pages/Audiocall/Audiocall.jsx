import React, { useState } from 'react';
import { Link, useLinkClickHandler } from 'react-router-dom';
import Level from './Level/Level';

// styles
import cl from './Audiocall.module.scss';

function Audiocall() {
  const [level, setLevel] = useState(0);
  useLinkClickHandler;

  const levelBtns = [1, 2, 3, 4, 5, 6].map((el) => {
    return (
      <button key={el} className={cl['level-btn']} onClick={() => setLevel(el)}>
        {el}
      </button>
    );
  });

  return (
    <div className={cl.audiocall}>
      <div className={cl['back-btn']}>
        <Link to="/games">
          <span>Назад</span>
        </Link>
      </div>
      {!level ? (
        <div className={cl.content}>
          <h2 className={cl.title}>Выбери свой уровень!</h2>
          <div className={cl['level-btns-container']}>{levelBtns}</div>
        </div>
      ) : (
        <Level levelNumber={level} />
      )}
    </div>
  );
}

export default Audiocall;
