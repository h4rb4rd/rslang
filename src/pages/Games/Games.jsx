import React from 'react';
import { Link } from 'react-router-dom';
// styles
import cl from './Games.module.scss';

function Games() {
  return (
    <div className={cl.games}>
      <div className={cl.content}>
        <h2 className={cl.title}>Развлекайся и учись!</h2>
        <div className={[cl.game, cl.savannah].join(' ')}>
          <Link to="/savannah">Саванна</Link>
        </div>
        <div className={[cl.game, cl.audiocall].join(' ')}>
          <Link to="/audiocall">Аудио вызов</Link>
        </div>
        <div className={[cl.game, cl.sprint].join(' ')}>
          <Link to="/sprint">Спринт</Link>
        </div>
        <div className={[cl.game, cl.owngame].join(' ')}>
          <Link to="/owngame">Своя игра</Link>
        </div>
      </div>
    </div>
  );
}

export default Games;
