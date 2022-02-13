import React from 'react';
import { MAX_WORDS_COUNT } from '../../../constants';

import cl from './Final.module.scss';

function Final({ score }) {
  return (
    <div className={cl.wrapper}>
      <div className={cl.title}>Results</div>
      <div className={cl.info}>
        <p>Right answers: {score}</p>
        <p>Right answers: {MAX_WORDS_COUNT - score}</p>
      </div>
      <button className={cl['again-btn']}>Play again</button>
    </div>
  );
}

export default Final;
