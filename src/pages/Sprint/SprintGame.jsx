import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context';
import { fetchUnauthorizedWords, fetchWords } from '../../services/fetchService';

// styles
import cl from './Sprint.module.scss';

function getRandomNum(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function SprintGame({ level }) {
  const { isAuth } = useContext(AuthContext);
  const [words, setWords] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);
  //   const writeWords = (words) => {
  //     console.log(words);
  //   };

  const setWordsList = (wordsList) => {
    const arr = [];
    wordsList.forEach((item) => {
      arr.push({
        id: item._id,
        word: item.word,
        wordTranslate: item.wordTranslate,
        countRight: 0,
      });
    });
    console.log(arr);
    setWords(arr);
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (isAuth) {
      fetchWords(userId, level, getRandomNum(0, 30), 20, setWordsList);
    } else {
      fetchUnauthorizedWords(level, getRandomNum(0, 30), setWordsList);
    }
    // setWordIndex(0);
    console.log(words);
  }, []);

  return (
    <div className={cl.sprintGame}>
      <div className={cl.wordWrapper}>
        <span>{words[wordIndex]?.word}</span>
        <span>{words[wordIndex]?.wordTranslate}</span>
      </div>
      <div className={cl.btnWrapper}>
        <button className={`${cl.answBtn} ${cl.btnNo}`}>No</button>
        <button className={`${cl.answBtn} ${cl.btnOk}`}>Ok</button>
      </div>
    </div>
  );
}

export default SprintGame;
