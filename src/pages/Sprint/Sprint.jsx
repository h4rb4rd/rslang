import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TEXTBOOK_WORDS_PER_PAGE } from '../../constants';
import AuthContext from '../../context';
import ApiService from '../../services/ApiService';
import LevelsGame from './LevelsGame';

// styles
import cl from './Sprint.module.scss';
import SprintGame from './SprintGame';
import getRandomNum from '../../utils/getRandomNum';

function Sprint() {
  const { state } = useLocation();
  const { isAuth } = useContext(AuthContext);
  const [isGame, setIsGame] = useState(state !== 'header');
  const [level, setLevel] = useState(0);
  const [words, setWords] = useState([]);
  const [statistic, setStatistic] = useState({});

  const levels = [1, 2, 3, 4, 5, 6];

  console.log('render');
  function getStatistic(data) {
    setStatistic(data);
  }

  const changeLevel = (lvl) => {
    setIsGame(true);
    setLevel(lvl);
    console.log(level);
  };

  const setWordsList = (wordsList) => {
    console.log(wordsList);
    const wordsListMapped = wordsList.map((item) => {
      const id = item._id || item.id;

      return {
        id,
        word: item.word,
        wordTranslate: item.wordTranslate,
        userWord: item.userWord,
        options: {
          ...item.userWord?.optional,
          // countRight: item.userWord?.optional.countRight || 0,
          statistics: {
            ...(item.userWord?.optional.statistics || { row: 0, wrong: 0, correct: 0 }),
          },
        },
      };
    });

    setWords(wordsListMapped);
  };

  useEffect(() => {
    console.log('effect', { words }, isGame);
    const userId = localStorage.getItem('userId');
    const groupNum = level;
    const pageNum = getRandomNum(0, 29);
    if (state === 'header') {
      if (isAuth) {
        ApiService.getWords(userId, groupNum, pageNum, TEXTBOOK_WORDS_PER_PAGE, setWordsList);
      } else {
        ApiService.getUnauthorizedWords(groupNum, pageNum, setWordsList);
      }
    } else {
      // setIsGame(true);
      console.log('effectState', state);
      const pageNumStor = localStorage.getItem('page-num');
      // const lvl = localStorage.getItem('group-num');
      // setLevel(lvl);S
      console.log('effectParam', userId, level, pageNumStor, TEXTBOOK_WORDS_PER_PAGE, isGame);
      ApiService.getNonEasyWords(userId, level, pageNumStor, TEXTBOOK_WORDS_PER_PAGE, setWordsList);
    }
    ApiService.getStatistics(userId, getStatistic);
    return () => {
      words.length = 0;
      console.log('unmountGame', { words });
      // setIsGame(false);
    };
  }, [level]);

  const tryAgain = () => {
    setIsGame(false);
    setLevel(0);
  };

  return (
    <div className={cl.sprint}>
      {!isGame ? (
        <LevelsGame levels={levels} changeLevel={changeLevel} state={state} />
      ) : (
        <SprintGame words={words} tryAgain={tryAgain} statistic={statistic} />
      )}
    </div>
  );
}

export default Sprint;
