import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../context';

// styles
import cl from './Games.module.scss';

function Games() {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  return (
    <div className={cl.games}>
      {!isAuth && (
        <div className={cl.promo}>
          <Link to="/about">
            <span>Узнать больше</span>
          </Link>
        </div>
      )}
      <div className={cl.content}>
        <h2 className={cl.title}>Развлекайся и учись!</h2>
        <div className={[cl.game, cl.audiocall].join(' ')}>
          <Link to="/audiocall">Аудио вызов</Link>
        </div>
        <div className={[cl.game, cl.sprint].join(' ')}>
          <Link to="/sprint" state="header">
            Спринт
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Games;
