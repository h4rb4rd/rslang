import React, { useEffect, useMemo, useState } from 'react';
import { TEXTBOOK_WORDS_PER_PAGE } from '../../constants';
import ApiService from '../../services/ApiService';

import cl from './SprintEnd.module.scss';

function SprintEndGame({ wordsList, score, tryAgain, seriesAnswer, statistic }) {
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
    optional.sprint.row = optional.sprint?.row > seriesAnswer ? optional.sprint?.row : seriesAnswer;
    ApiService.updateUserStatistic(userId, learnedWords, optional);
  };

  useEffect(() => {
    let learnedWords = statistic.learnedWords || 0;
    const correctAnswer = wordsList?.filter((word) => word.options.statistics.row).length;
    const mistakeAnswer = wordsList?.filter((word) => !word.options.statistics.row).length;
    setCorrectAnswerCount(correctAnswer);
    setMistakesAnswerCount(mistakeAnswer);
    const newWord = wordsList?.filter((word) => !word.userWord).length;
    wordsList?.forEach((word) => {
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
    if (wordsList.length) {
      updateStatistic(learnedWords, newWord, correctAnswer, mistakeAnswer);
    }
  }, [wordsList]);

  return (
    <div className={cl.endWrapper}>
      <div className={cl.resultGame}>
        <div>{score}</div>
        <div className={cl.resultHead}>Результат</div>
        <button className={cl.tryAgain} onClick={() => tryAgain()}>
          Заново
        </button>
      </div>
      <div className={cl.wordsWrapper}>
        <div className={cl.words}>
          <div className={cl.headResult}>
            <div>Количество ошибок</div>
            <div>{mistakesAnswerCount}</div>
          </div>
          <div className={cl.headResult}>
            <div>Количество правильных</div>
            <div>{correctAnswerCount}</div>
          </div>
          <div className={cl.headResult}>
            <div>Серия правильных ответов</div>
            <div>{seriesAnswer}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SprintEndGame;