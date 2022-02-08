import React, { useContext, useEffect, useMemo, useState } from 'react';
import AuthContext from '../../context';
import ApiService from '../../services/ApiService';

// styles
import cl from './Sprint.module.scss';

function getRandomNum(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function isRight() {
  return Math.random() > 0.5;
}

function SprintGame({ level }) {
  const { isAuth } = useContext(AuthContext);
  const [wordIndex, setWordIndex] = useState(0);
  const [words, setWords] = useState([]);

  const [seconds, setSeconds] = useState(60);

  const translate = useMemo(() => {
    let result = '';
    if (isRight()) {
      result = words[wordIndex]?.wordTranslate;
    } else {
      let tmpIndex = 0;
      tmpIndex = getRandomNum(0, words.length - 1);
      while (tmpIndex === wordIndex) {
        tmpIndex = getRandomNum(0, words.length - 1);
      }
      result = words[tmpIndex]?.wordTranslate;
    }
    return result;
  }, [words, wordIndex]);

  const setWordsList = (wordsList) => {
    const arr = wordsList.map((item) => {
      return {
        id: item._id,
        word: item.word,
        wordTranslate: item.wordTranslate,
        countRight: 0,
      };
    });
    setWords(arr);
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (isAuth) {
      ApiService.getWords(userId, level - 1, getRandomNum(0, 30), 20, setWordsList);
    } else {
      ApiService.getUnauthorizedWords(level - 1, getRandomNum(0, 30), setWordsList);
    }
  }, []);

  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [seconds]);

  const checkAnswer = (ans) => {
    if (ans === 'yes') {
      if (translate === words[wordIndex].wordTranslate) {
        if (words[wordIndex].countRight !== 3) {
          words[wordIndex].countRight++;
          console.log('yes');
        }
      } else {
        words[wordIndex].countRight = 0;
        console.log('no');
      }
    } else if (translate !== words[wordIndex].wordTranslate) {
      if (words[wordIndex].countRight !== 3) {
        words[wordIndex].countRight++;
        console.log('yes');
      }
    } else {
      words[wordIndex].countRight = 0;
      console.log('no');
    }
    if (wordIndex < words.length) {
      setWordIndex(wordIndex + 1);
    } else {
      setWordIndex(0);
    }
  };

  return (
    <div className={cl.sprintGame}>
      <div className={cl.wordWrapper}>
        <span>{words[wordIndex]?.word}</span>
        <span>{translate}</span>
      </div>
      <div>{seconds}</div>
      <div className={cl.btnWrapper}>
        <button
          className={`${cl.answBtn} ${cl.btnNo}`}
          onClick={() => {
            checkAnswer('no');
          }}
        >
          No
        </button>
        <button
          className={`${cl.answBtn} ${cl.btnOk}`}
          onClick={() => {
            checkAnswer('yes');
          }}
        >
          Yes
        </button>
      </div>
    </div>
  );
}

export default SprintGame;
