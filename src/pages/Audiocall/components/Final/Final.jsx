import React, { useState, useEffect } from 'react';
import { MAX_WORDS_COUNT } from '../../helper';
import ApiService from '../../../../services/ApiService';

import cl from './Final.module.scss';

function Final({ words, score, tryAgain, maxRow, statistic }) {
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [mistakesAnswerCount, setMistakesAnswerCount] = useState(0);
  const userId = localStorage.getItem('userId');

  const updateStatistic = (learnedWords, newWord, correctAnswer, mistakeAnswer) => {
    const optional = {
      ...statistic.optional,
    };

    if (!optional.sprint) {
      optional.sprint = {
        newWord: 0,
        correct: 0,
        wrong: 0,
        row: 0,
      };
    }

    optional.sprint.newWord += newWord;
    optional.sprint.correct += correctAnswer;
    optional.sprint.wrong += mistakeAnswer;
    optional.sprint.row = optional.sprint?.row > maxRow ? optional.sprint?.row : maxRow;
    ApiService.updateUserStatistic(userId, learnedWords, optional);
  };

  useEffect(() => {
    let learnedWords = statistic.learnedWords || 0;
    const correctAnswer = words?.filter((word) => word.options.statistics.row).length;
    const mistakeAnswer = words?.filter((word) => !word.options.statistics.row).length;
    setCorrectAnswerCount(correctAnswer);
    setMistakesAnswerCount(mistakeAnswer);
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
      updateStatistic(learnedWords, newWord, correctAnswer, mistakeAnswer);
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
