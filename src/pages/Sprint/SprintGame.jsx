import React, { useContext, useEffect, useMemo, useState } from 'react';
import AuthContext from '../../context';
import ApiService from '../../services/ApiService';

// styles
import cl from './Sprint.module.scss';
import SprintEndGame from './SprintEndGame';
import SprintTimer from './SprintTimer';
import SprintWords from './SprintWords';

function showCorrectTranslate() {
  return Math.random() > 0.5;
}

function getRandomNum(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function SprintGame({ words, tryAgain, statistic }) {
  const [wordIndex, setWordIndex] = useState(0);

  const [score, setScore] = useState(0);
  const [increment, setIncrement] = useState(10);
  const [rightAnswersCount, setRightAnswersCount] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [seriesCorrectAnswers, setSeriesCorrectAnswers] = useState(0);
  const [accCorrectAnswers, setAccCorrectAnswers] = useState(0);

  const translate = useMemo(() => {
    let result = '';

    if (showCorrectTranslate()) {
      result = words[wordIndex]?.wordTranslate;
    } else {
      let tmpIndex = getRandomNum(0, words.length - 1);

      while (tmpIndex === wordIndex) {
        tmpIndex = getRandomNum(0, words.length - 1);
      }

      result = words[tmpIndex]?.wordTranslate;
    }

    return result;
  }, [words, wordIndex]);

  function checkSeriesAnswer() {
    if (accCorrectAnswers > seriesCorrectAnswers) {
      setSeriesCorrectAnswers(accCorrectAnswers);
      setAccCorrectAnswers(0);
    }
  }

  const changeIsEnd = () => {
    checkSeriesAnswer();
    setIsEnd(true);
  };

  // console.log('file', words);

  function answerRight() {
    const correct = words[wordIndex].options.statistics?.correct || 0;
    words[wordIndex].options.statistics.correct = correct + 1;
    setScore(score + increment);
    if (increment < 30 && rightAnswersCount === 2) {
      setIncrement(increment + 10);
    }
    if (rightAnswersCount < 3) {
      setRightAnswersCount(rightAnswersCount + 1);
    } else {
      setRightAnswersCount(0);
    }
  }

  function answerMistake() {
    const wrong = words[wordIndex].options.statistics?.wrong || 0;
    words[wordIndex].options.statistics.wrong = wrong + 1;
    checkSeriesAnswer();
    setIncrement(10);
    setRightAnswersCount(0);
  }

  const incCountRight = (word) => {
    console.log('right', word);
    setAccCorrectAnswers(accCorrectAnswers + 1);
    if (word.options.isHard) {
      // if (word.options.countRight !== 5) {
      //   word.option.countRight++;
      //   answerRight();
      // }
      if (word.options.statistics.row !== 5) {
        word.options.statistics.row += 1;
        answerRight();
      }
    } else if (word.options.statistics.row !== 3) {
      word.options.statistics.row += 1;
      answerRight();
    }
  };

  const checkAnswer = (ans) => {
    if (isEnd) return;
    if (ans === 'yes') {
      if (translate === words[wordIndex]?.wordTranslate) {
        incCountRight(words[wordIndex]);
      } else {
        words[wordIndex].options.statistics.row = 0;
        answerMistake();
      }
    } else if (translate !== words[wordIndex]?.wordTranslate) {
      incCountRight(words[wordIndex]);
    } else {
      words[wordIndex].options.statistics.row = 0;
      answerMistake();
    }
    if (wordIndex < words.length - 1) {
      setWordIndex(wordIndex + 1);
    } else {
      setWordIndex(0);
    }
  };

  const checkRightAnswers = (value) => {
    if (rightAnswersCount === 0) {
      return '';
    }
    if (rightAnswersCount >= value) {
      return cl.right;
    }
    return '';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      checkAnswer('yes');
    }

    if (e.key === 'ArrowLeft') {
      checkAnswer('no');
    }
  };

  useEffect(() => {
    console.log('game', { words });
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      console.log('gameUnmount');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [words, wordIndex, translate]);

  return (
    <div className={cl.sprintGame}>
      {!isEnd ? (
        <div className={cl.sprintGame}>
          <div className={cl.scoreWrap}>
            <div className={cl.score}>{score}</div>
            <div className={cl.inc}>{`+${increment}`}</div>
            <div className={cl.rightPoints}>
              <div className={`${cl.point} ${checkRightAnswers(1)}`}> </div>
              <div className={`${cl.point} ${checkRightAnswers(2)}`}> </div>
              <div className={`${cl.point} ${checkRightAnswers(3)}`}> </div>
            </div>
          </div>
          <SprintWords word={words[wordIndex]?.word} translate={translate} />
          <SprintTimer secCount={60} setEnd={changeIsEnd} />
          <div className={cl.btnWrapper}>
            <button className={`${cl.answBtn} ${cl.btnNo}`} onClick={() => checkAnswer('no')}>
              No
            </button>
            <button className={`${cl.answBtn} ${cl.btnOk}`} onClick={() => checkAnswer('yes')}>
              Yes
            </button>
          </div>
        </div>
      ) : (
        <SprintEndGame
          wordsList={words}
          score={score}
          tryAgain={tryAgain}
          seriesAnswer={seriesCorrectAnswers}
          statistic={statistic}
        />
      )}
    </div>
  );
}

export default SprintGame;
