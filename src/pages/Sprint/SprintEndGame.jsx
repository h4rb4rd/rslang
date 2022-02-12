import React, { useEffect, useState } from 'react';
import ApiService from '../../services/ApiService';

import cl from './SprintEnd.module.scss';

function SprintEndGame({ wordsList, score, tryAgain }) {
  const [correctAnswerCount, setCorrectAnswerCount] = useState(-1);
  const [mistakesAnswerCount, setMistakesAnswerCount] = useState(-1);
  const userId = localStorage.getItem('userId');
  const wordsErrorList = wordsList.filter((word) => !word.options.countRight);
  const wordsRightList = wordsList.filter((word) => word.options.countRight);

  function showStatistic(data) {
    console.log('stat', { data });
  }

  useEffect(() => {
    const learnedWords = wordsList?.filter(
      (word) => word.options.countRight === 3 || word.options.countRight === 5
    ).length;
    setCorrectAnswerCount(wordsList?.filter((word) => word.options.countRight).length);
    setMistakesAnswerCount(wordsList?.filter((word) => !word.options.countRight).length);
    wordsList?.forEach((word) => {
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

      if (word.userWord?.optional) {
        ApiService.updateUserWord(userId, word.id, 'easy', optional);
      } else {
        ApiService.addUserWord(userId, word.id, 'easy', optional);
      }
    });

    ApiService.getStatistics(userId, showStatistic);

    ApiService.updateUserStatistic(userId, learnedWords, {});
  }, [wordsList]);

  return (
    <div className={cl.endWrapper}>
      <div className={cl.resultGame}>
        <div>{score}</div>
        <button className={cl.tryAgain} onClick={() => tryAgain(false)}>
          Try Again
        </button>
      </div>
      <div className={cl.wordsWrapper}>
        <div className={cl.words}>
          <div>
            <div className={cl.headResult}>
              {' '}
              <div>Mistakes</div>
              <div>{mistakesAnswerCount}</div>{' '}
            </div>
            {wordsErrorList.map((word) => (
              <div className={cl.word} key={word.id}>{`${word.word} - ${word.wordTranslate}`}</div>
            ))}
          </div>
          <div>
            <div className={cl.headResult}>
              <div>Correct Answers</div>
              <div>{correctAnswerCount}</div>{' '}
            </div>
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
