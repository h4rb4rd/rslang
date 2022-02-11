import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { TEXTBOOK_WORDS_PER_PAGE } from '../../constants';

// styles
import cl from './Audiocall.module.scss';

function Audiocall() {
  const levelsBtns = [1, 2, 3, 4, 5, 6].map((el) => {
    return (
      <button key={el} className={cl['level-btn']}>
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
      <div className={cl.content}>
        <h2 className={cl.title}>Выбери свой уровень!</h2>
        <div className={cl['level-btns-container']}>{levelsBtns}</div>
      </div>
    </div>
  );
}

export default Audiocall;
