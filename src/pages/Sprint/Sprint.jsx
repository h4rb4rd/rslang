import React, { useContext, useEffect, useState } from 'react';
import { useLinkClickHandler } from 'react-router-dom';
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
  const [isGame, setIsGame] = useState(false);
  const [level, setLevel] = useState(0);
  const [words, setWords] = useState([]);
  const [statistic, setStatistic] = useState({});
  useLinkClickHandler;

  const levels = [1, 2, 3, 4, 5, 6];

  function getStatistic(data) {
    setStatistic(data);
  }

  const changeLevel = (lvl) => {
    setIsGame(true);
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
        userWord: item.userWord,
        options: {
          ...item.userWord?.optional,
          countRight: item.userWord?.optional.countRight || 0,
        },
      };
    });

    setWords(wordsListMapped);
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const groupNum = level;
    const pageNum = getRandomNum(0, 29);
    if (isAuth) {
      ApiService.getWords(userId, groupNum, pageNum, MAX_WORD_COUNT, setWordsList);
    } else {
      ApiService.getUnauthorizedWords(groupNum, pageNum, setWordsList);
    }
    ApiService.getStatistics(userId, getStatistic);
    // setWordIndex(0);
  }, [level]);

  return (
    <div className={cl.sprint}>
      {!isGame ? (
        <div className={cl.lvlWrapper}>
          {levels.map((item) => (
            <LevelGame key={item} level={item} changeLevel={changeLevel} />
          ))}
        </div>
      ) : (
        <SprintGame words={words} tryAgain={setIsGame} statistic={statistic} />
      )}
    </div>
  );
}

export default Sprint;
