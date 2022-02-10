import React, { useEffect } from 'react';
import ApiService from '../../services/ApiService';

import cl from './SprintEnd.module.scss';

function SprintEndGame({ wordsList, score, tryAgain }) {
  const wordsErrorList = wordsList.filter((word) => !word.options.countRight);
  const wordsRightList = wordsList.filter((word) => word.options.countRight);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    wordsList?.forEach((word) => {
      console.log('useEffectEnd');
      const optional = { ...word.options };
      if (optional.isHard) {
        if (optional.countRight === 5) {
          optional.isHard = false;
          optional.isEasy = true;
        }
      } else if (optional.countRight === 3) {
        optional.isEasy = true;
      }
      if (!optional.countRight) {
        optional.isEasy = false;
      }
      ApiService.updateUserWord(userId, word.id, 'easy', optional);
    });
  }, [wordsList]);

  return (
    <div className={cl.endWrapper}>
      <div className={cl.resultGame}>
        <div>{score}</div>
        <button onClick={() => tryAgain(0)}>Try Again</button>
      </div>
      <div className={cl.wordsWrapper}>
        <div className={cl.words}>
          <div>
            <div className={cl.headResult}>Mistakes</div>
            {wordsErrorList.map((word) => (
              <div className={cl.word} key={word.id}>{`${word.word} - ${word.wordTranslate}`}</div>
            ))}
          </div>
          <div>
            <div className={cl.headResult}>Correct Answers</div>
            {wordsRightList.map((word) => (
              <div className={cl.word} key={word.id}>{`${word.word} - ${word.wordTranslate}`}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SprintEndGame;
