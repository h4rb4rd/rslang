import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TEXTBOOK_WORDS_PER_PAGE } from '../../constants';
import AuthContext from '../../context';
import ApiService from '../../services/ApiService';
import LevelsGame from './LevelsGame';

// styles
import cl from './Sprint.module.scss';
import SprintGame from './SprintGame';

function getRandomNum(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function Sprint() {
  const { state } = useLocation();
  const { isAuth } = useContext(AuthContext);
  const [isGame, setIsGame] = useState(false);
  const [level, setLevel] = useState(0);
  const [words, setWords] = useState([]);
  const [statistic, setStatistic] = useState({});

  const levels = [1, 2, 3, 4, 5, 6];

  // if (state !== 'header') {
  //   console.log('if');
  //   // setIsGame(true);
  //   setLevel(localStorage.getItem('group-num'));
  // }

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

  const getWordForGame = (userId, groupNum, pageNumParam) => {
    // let wordsListGame = [];
    // let pageNumLoc = +pageNumParam;
    // ApiService.getNonEasyWords(userId, 1, 2, 20, console.log);
    // const setWordsListGame = (data) => {
    //   wordsListGame = data.map((item) => {
    //     if (!item.userWord?.optional?.isEasy) {
    //       return {
    //         id: item._id || item.id,
    //         word: item.word,
    //         wordTranslate: item.wordTranslate,
    //         userWord: item.userWord,
    //         options: {
    //           ...item.userWord?.optional,
    //           countRight: item.userWord?.optional.countRight || 0,
    //         },
    //       };
    //     }
    //     return '';
    //   });
    //   wordsListGame = wordsListGame.filter((item) => item);
    //   pageNumLoc--;
    // };
    // while (wordsListGame.length < 20 && pageNumLoc > -1) {
    //   if (isAuth) {
    //     ApiService.getWords(
    //       userId,
    //       groupNum,
    //       pageNumLoc,
    //       TEXTBOOK_WORDS_PER_PAGE,
    //       setWordsListGame
    //     );
    //   } else {
    //     ApiService.getUnauthorizedWords(groupNum, pageNumLoc, setWordsListGame);
    //   }
    // }
    // setWords(wordsListGame.slice(0, 20));
  };

  useEffect(() => {
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
      setIsGame(true);
      const pageNumStor = localStorage.getItem('page-num');
      const lvl = localStorage.getItem('group-num');
      getWordForGame(userId, lvl, pageNumStor);
    }
    ApiService.getStatistics(userId, getStatistic);
    return () => {
      words.length = 0;
      // setIsGame(false);
    };
  }, [level]);

  const tryAgain = () => {
    setIsGame(false);
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
