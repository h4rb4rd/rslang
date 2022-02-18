import React, { useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';

import useOnClickOutside from '../../hooks/useOnClickOutside';
import AuthContext from '../../context';

// styles
import cl from './Navigation.module.scss';

// components
import PopUp from '../UI/PopUp';
import Pagination from '../UI/Pagination/Pagination';

function Navigation({
  pageNum,
  groupNum,
  isTranslate,
  isPageEasy,
  setIsTranslate,
  setPageNum,
  setGroupNum,
}) {
  const { isAuth } = useContext(AuthContext);
  const [isChaptersVisible, setIsChaptersVisible] = useState(false);
  const [chapterTitle, setChapterTitle] = useState(`Раздел ${groupNum + 1}`);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [isGamesVisible, setGamesVisible] = useState(false);

  const chaptersInfo = useRef();
  const settingsInfo = useRef();
  const gamesInfo = useRef();

  const chapters = ['Раздел 1', 'Раздел 2', 'Раздел 3', 'Раздел 4', 'Раздел 5', 'Раздел 6'];

  const gamesClasses = [cl.games];
  if (isPageEasy) {
    gamesClasses.push(cl.disabled);
  }

  useOnClickOutside(chaptersInfo, () => setIsChaptersVisible(false));
  useOnClickOutside(settingsInfo, () => setIsSettingsVisible(false));
  useOnClickOutside(gamesInfo, () => setGamesVisible(false));

  const changeChapter = (idx, chapter) => {
    setGroupNum(idx);
    setChapterTitle(chapter);
  };
  return (
    <div className={cl.navigation}>
      <div
        className={cl.chapters}
        ref={chaptersInfo}
        role="button"
        onClick={() => setIsChaptersVisible(true)}
        onKeyDown={() => setIsChaptersVisible(true)}
        tabIndex={0}
      >
        <span>{chapterTitle}</span>
        <PopUp posY="4.3rem" posX="9.9rem" isVisible={isChaptersVisible}>
          <div className={cl.buttons}>
            {chapters.map((chapter, idx) => {
              return (
                <button
                  key={chapter}
                  className={cl.chapter}
                  onClick={() => changeChapter(idx, chapter)}
                >
                  {chapter}
                </button>
              );
            })}
            {isAuth && (
              <button className={cl.chapter} onClick={() => changeChapter(6, 'Раздел 7')}>
                Раздел 7
              </button>
            )}
          </div>
        </PopUp>
      </div>
      <Pagination isPageEasy={isPageEasy} pageNum={pageNum} setPageNum={setPageNum} />
      <div
        className={gamesClasses.join(' ')}
        ref={gamesInfo}
        role="button"
        onClick={() => setGamesVisible(true)}
        onKeyDown={() => setGamesVisible(true)}
        tabIndex={-2}
      >
        <span>Мини игры</span>
        <PopUp posY="4.3rem" posX="9.9rem" isVisible={isGamesVisible}>
          <Link to="/audiocall">Аудио вызов</Link>
          <Link to="/sprint" state="textbook">
            Спринт
          </Link>
        </PopUp>
      </div>
      <div
        className={cl.settings}
        ref={settingsInfo}
        role="button"
        onClick={() => setIsSettingsVisible(true)}
        onKeyDown={() => setIsSettingsVisible(true)}
        tabIndex={-1}
      >
        <span>Настройки</span>
        <PopUp posY="4.3rem" posX="11.2rem" isVisible={isSettingsVisible}>
          <div className={cl.options}>
            <label htmlFor="translate" className={cl.label}>
              <input
                type="checkbox"
                checked={isTranslate}
                onChange={() => setIsTranslate(!isTranslate)}
                id="translate"
              />
              <span>Отображать перевод</span>
            </label>
          </div>
        </PopUp>
      </div>
    </div>
  );
}

export default Navigation;
