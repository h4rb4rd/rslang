import React, { useContext, useEffect, useMemo, useState } from 'react';
import AuthContext from '../../context';
import ApiService from '../../services/ApiService';

// styles
import cl from './Sprint.module.scss';
import SprintTimer from './SprintTimer';
import SprintWords from './SprintWords';

function showCorrectTranslate() {
  return Math.random() > 0.5;
}

function getRandomNum(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function SprintGame({ words }) {
  const [wordIndex, setWordIndex] = useState(0);

  const [score, setScore] = useState(0);
  const [increment, setIncrement] = useState(10);
  const [rightAnswersCount, setRightAnswersCount] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  const translate = useMemo(() => {
    let result = '';

    if (showCorrectTranslate()) {
      result = words[wordIndex]?.wordTranslate;
    } else {
      let tmpIndex = getRandomNum(0, 19);

      while (tmpIndex === wordIndex) {
        tmpIndex = getRandomNum(0, 19);
      }

      result = words[tmpIndex]?.wordTranslate;
    }

    return result;
  }, [words, wordIndex]);

  console.log('file', words);

  function answerRight() {
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
    setIncrement(10);
    setRightAnswersCount(0);
  }

  const checkAnswer = (ans) => {
    if (isEnd) return;
    console.log({ words, wordIndex, translate });
    if (ans === 'yes') {
      if (translate === words[wordIndex]?.wordTranslate) {
        if (words[wordIndex].countRight !== 3) {
          words[wordIndex].countRight++;
          answerRight();
          console.log('yes');
        }
      } else {
        words[wordIndex].countRight = 0;
        answerMistake();
        console.log('no');
      }
    } else if (translate !== words[wordIndex]?.wordTranslate) {
      if (words[wordIndex].countRight !== 3) {
        words[wordIndex].countRight++;
        answerRight();
        console.log('yes');
      }
    } else {
      words[wordIndex].countRight = 0;
      answerMistake();
      console.log('no');
    }
    if (wordIndex < words.length - 1) {
      setWordIndex(wordIndex + 1);
    } else {
      setWordIndex(0);
    }
  };

  const checkrightAnswersCountOne = () => {
    if (rightAnswersCount === 0) {
      return '';
    }
    if (rightAnswersCount >= 1) {
      return cl.right;
    }
    return '';
  };

  const checkrightAnswersCountTwo = () => {
    if (rightAnswersCount === 0) {
      return '';
    }
    if (rightAnswersCount >= 2) {
      return cl.right;
    }
    return '';
  };

  const checkrightAnswersCountThree = () => {
    if (rightAnswersCount === 0) {
      return '';
    }
    if (rightAnswersCount >= 3) {
      return cl.right;
    }
    return '';
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
    console.log('handleKeyDown', e);
    e.preventDefault();
    if (e.key === 'ArrowRight') {
      checkAnswer('yes');
    }

    if (e.key === 'ArrowLeft') {
      checkAnswer('no');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [words, wordIndex, translate]);

  return (
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
      <SprintTimer secCount={60} setEnd={setIsEnd} />
      <div className={cl.btnWrapper}>
        <button className={`${cl.answBtn} ${cl.btnNo}`} onClick={() => checkAnswer('no')}>
          No
        </button>
        <button className={`${cl.answBtn} ${cl.btnOk}`} onClick={() => checkAnswer('yes')}>
          Yes
        </button>
      </div>
    </div>
  );
}

export default SprintGame;
