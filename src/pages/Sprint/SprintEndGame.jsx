import React, { useEffect, useMemo, useState } from 'react';
import { TEXTBOOK_WORDS_PER_PAGE } from '../../constants';
import ApiService from '../../services/ApiService';

import cl from './SprintEnd.module.scss';

function SprintEndGame({ wordsList, score, tryAgain, seriesAnswer, statistic }) {
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [mistakesAnswerCount, setMistakesAnswerCount] = useState(0);
  const userId = localStorage.getItem('userId');
  const wordsErrorList = wordsList.filter((word) => !word.options.countRight);
  const wordsRightList = wordsList.filter((word) => word.options.countRight);

  const updateStatistic = (learnedWords, newWord, correctAnswer, mistakeAnswer) => {
    const percent = (correctAnswer * 100) / TEXTBOOK_WORDS_PER_PAGE;
    const optional = {
      ...statistic.optional,
      // seriesAnswer:
      //   statistic.optional?.seriesAnswer > seriesAnswer
      //     ? statistic.optional?.seriesAnswer
      //     : seriesAnswer,
      // percentAnswer: percent,
      // countNewWord: statistic.optional?.countNewWord || 0 + newWord,
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
    // const learnedWords = wordsList?.filter(
    //   (word) => word.options.countRight === 3 || word.options.countRight === 5
    // ).length;
    console.log('endGame', { wordsList });
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
        <button className={cl.tryAgain} onClick={() => tryAgain()}>
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
