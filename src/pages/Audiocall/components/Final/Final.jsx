import React, { useEffect, useContext } from 'react';
import { MAX_WORDS_COUNT } from '../../helper';
import ApiService from '../../../../services/ApiService';
import AuthContext from '../../../../context/index.js';

import cl from './Final.module.scss';

function Final({ words, score, tryAgain, maxRow, statistic }) {
  const { isAuth } = useContext(AuthContext);
  const userId = localStorage.getItem('userId');

  const updateStatistic = (learnedWords, newWord, correctAnswer, mistakeAnswer) => {
    const optional = {
      ...statistic.optional,
    };

    if (!optional.audiocall) {
      optional.audiocall = {
        newWord: 0,
        correct: 0,
        wrong: 0,
        row: 0,
      };
    }

    optional.audiocall.newWord += newWord;
    optional.audiocall.correct += correctAnswer;
    optional.audiocall.wrong += mistakeAnswer;
    optional.audiocall.row = optional.audiocall?.row > maxRow ? optional.audiocall?.row : maxRow;
    ApiService.updateUserStatistic(userId, learnedWords, optional);
  };

  useEffect(() => {
    if (isAuth) {
      let learnedWords = statistic.learnedWords || 0;
      const newWord = words?.filter((word) => !word.userWord).length;
      words?.forEach((word) => {
        const optional = { ...word.options };
        if (optional.isHard) {
          if (optional.statistics.row === 5) {
            optional.isHard = false;
            optional.isEasy = true;
            learnedWords++;
          }
        } else if (optional.statistics.row === 3) {
          optional.isEasy = true;
          learnedWords++;
        }
        if (!optional.statistics.row) {
          optional.isEasy = false;
          learnedWords--;
          if (learnedWords < 0) {
            learnedWords = 0;
          }
        }

        if (word.userWord?.optional) {
          ApiService.updateUserWord(userId, word.id, 'easy', optional);
        } else {
          ApiService.addUserWord(userId, word.id, 'easy', optional);
        }
      });
      if (words.length) {
        const mistakes = MAX_WORDS_COUNT - score;
        updateStatistic(learnedWords, newWord, score, mistakes);
      }
    }
  }, [words]);

  return (
    <div className={cl.wrapper}>
      <div className={cl.title}>Результаты</div>
      <div className={cl.info}>
        <p>Процент правильных ответов: {Math.round((score / MAX_WORDS_COUNT) * 100)}%</p>
        <p>Правильные ответы: {score}</p>
        <p>Неправильные ответы: {MAX_WORDS_COUNT - score}</p>
        <p>Правильных ответов подряд: {maxRow}</p>
      </div>
      <button onClick={tryAgain} className={cl['again-btn']}>
        Cыграть еще раз
      </button>
    </div>
  );
}

export default Final;
