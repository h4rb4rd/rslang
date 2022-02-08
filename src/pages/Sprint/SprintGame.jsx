import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context';
import { fetchUnauthorizedWords, fetchWords } from '../../services/fetchService';

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
  const [translate, setTranslate] = useState('');
  function setTranslateWord() {
    console.log('setTranslate');
    if (isRight()) {
      setTranslate(words[wordIndex]?.wordTranslate);
    } else {
      let tmpIndex = 0;
      if (words?.length) {
        tmpIndex = getRandomNum(0, words?.length - 1);
        while (tmpIndex === wordIndex) {
          tmpIndex = getRandomNum(0, words?.length - 1);
        }
      }

      setTranslate(words[tmpIndex]?.wordTranslate);
    }
    console.log(translate, words[wordIndex]?.wordTranslate);
  }
  const [words, setWords] = useState([], setTranslateWord);

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
    // console.log(words);
    // setTranslateWord();
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (isAuth) {
      fetchWords(userId, level, getRandomNum(0, 30), 20, setWordsList);
    } else {
      fetchUnauthorizedWords(level, getRandomNum(0, 30), setWordsList);
    }
    // setTranslateWord();
  }, []);

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
    setTranslateWord();
  };

  return (
    <div className={cl.sprintGame}>
      <div className={cl.wordWrapper}>
        <span>{words[wordIndex]?.word}</span>
        <span>{translate}</span>
      </div>
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
