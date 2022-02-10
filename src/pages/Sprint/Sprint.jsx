import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context';
import ApiService from '../../services/ApiService';
import LevelGame from './LevelGame';

// styles
import cl from './Sprint.module.scss';
import SprintGame from './SprintGame';

function getRandomNum(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const MAX_WORD_COUNT = 20;

function Sprint() {
  const { isAuth } = useContext(AuthContext);
  const [level, setLevel] = useState(0);
  const [words, setWords] = useState([]);

  const levels = [1, 2, 3, 4, 5, 6];

  const changeLevel = (lvl) => {
    setLevel(lvl);
    console.log(lvl);
  };

  const setWordsList = (wordsList) => {
    console.log('sprint', { wordsList });
    const wordsListMapped = wordsList.map((item) => {
      const id = item._id || item.id;

      return {
        id,
        word: item.word,
        wordTranslate: item.wordTranslate,
        option: { ...item.option, countRight: item.option?.countRight || 0 },
      };
    });

    setWords(wordsListMapped);
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const groupNum = level - 1;
    const pageNum = getRandomNum(0, 30);
    if (isAuth) {
      ApiService.getWords(userId, groupNum, pageNum, MAX_WORD_COUNT, setWordsList);
    } else {
      ApiService.getUnauthorizedWords(groupNum, pageNum, setWordsList);
    }

    // setWordIndex(0);
  }, [level]);

  return (
    <div className={cl.sprint}>
      {!level ? (
        <div className={cl.lvlWrapper}>
          {levels.map((item) => (
            <LevelGame key={item} level={item} changeLevel={changeLevel} />
          ))}
        </div>
      ) : (
        <SprintGame words={words} tryAgain={setLevel} />
      )}
    </div>
  );
}

export default Sprint;
