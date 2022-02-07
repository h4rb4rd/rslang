import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../context';
import ApiService from '../../services/ApiService';

// styles
import cl from './Textbook.module.scss';

// components
import Navigation from '../../components/Navigation';
import WordCards from '../../components/WordCards';
import Preloader from '../../components/Preloader/Preloader';

const WORDS_PER_PAGE = 20;

function Textbook() {
  const { isAuth } = useContext(AuthContext);
  const [words, setWords] = useState(null);
  const [pageNum, setPageNum] = useState(Number(localStorage.getItem('page-num')) || 0);
  const [groupNum, setGroupNum] = useState(Number(localStorage.getItem('group-num')) || 0);
  const [isTranslate, setIsTranslate] = useState(false);
  const [isPageEasy, setIsPageEasy] = useState(false);

  const userId = localStorage.getItem('userId');

  const getWords = () => {
    if (!userId) {
      ApiService.getUnauthorizedWords(groupNum, pageNum, setWords);
    } else if (groupNum === 6) {
      ApiService.getHardWords(userId, setWords);
    } else {
      ApiService.getWords(userId, groupNum, pageNum, WORDS_PER_PAGE, setWords);
    }

    localStorage.setItem('page-num', pageNum);
    localStorage.setItem('group-num', groupNum);
  };

  useEffect(() => {
    getWords();
  }, [pageNum, groupNum]);

  useEffect(() => {
    if (words?.length) {
      setIsPageEasy(words?.every((word) => word?.userWord?.optional?.isEasy));
    } else {
      setIsPageEasy(false);
    }
  }, [words]);

  return (
    <div className={cl.textbook}>
      <div className={cl.content}>
        <h2 className={cl.title}>Учебник</h2>
        <Navigation
          pageNum={pageNum}
          groupNum={groupNum}
          isTranslate={isTranslate}
          isPageEasy={isPageEasy}
          setIsTranslate={setIsTranslate}
          setPageNum={setPageNum}
          setGroupNum={setGroupNum}
        />
        {words ? (
          <WordCards
            words={words}
            isTranslate={isTranslate}
            groupNum={groupNum}
            pageNum={pageNum}
            wordsLimit={WORDS_PER_PAGE}
            setWords={setWords}
          />
        ) : (
          <Preloader />
        )}
      </div>
      {!isAuth && (
        <div className={cl.promo}>
          <Link to="/about">
            <span>Узнать больше</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Textbook;
