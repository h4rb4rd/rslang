import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../context';
import { fetchHardWords, fetchWords, fetchUnauthorizedWords } from '../../services/fetchService';

// styles
import cl from './Textbook.module.scss';

// components
import Navigation from '../../components/Navigation';
import WordCards from '../../components/WordCards';
import Preloader from '../../components/Preloader/Preloader';

function Textbook() {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [words, setWords] = useState(null);
  const [pageNum, setPageNum] = useState(Number(localStorage.getItem('page-num')) || 0);
  const [groupNum, setGroupNum] = useState(Number(localStorage.getItem('group-num')) || 0);
  const [isTranslate, setIsTranslate] = useState(false);
  const [isPageEasy, setIsPageEasy] = useState(false);

  const userId = localStorage.getItem('userId');
  const wordsPerPage = 20;

  useEffect(() => {
    if (!isAuth) {
      fetchUnauthorizedWords(groupNum, pageNum, setWords);
    } else if (groupNum === 6) {
      fetchHardWords(userId, setWords);
    } else {
      fetchWords(userId, groupNum, pageNum, wordsPerPage, setWords);
    }

    localStorage.setItem('page-num', pageNum);
    localStorage.setItem('group-num', groupNum);
  }, [pageNum, groupNum]);

  useEffect(() => {
    setIsPageEasy(words?.every((word) => word?.userWord?.optional?.isEasy === true));
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
          <WordCards words={words} isTranslate={isTranslate} groupNum={groupNum} isAuth={isAuth} />
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
