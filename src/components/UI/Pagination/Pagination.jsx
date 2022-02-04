import React, { useState, useRef } from 'react';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

// styles
import cl from './Pagination.module.scss';

// components
import PopUp from '../PopUp';

function Pagination({ isPageEasy, pageNum, setPageNum }) {
  const [isPagesVisible, setIsPagesVisibleVisible] = useState(false);
  const [pageTitle, setPageTitle] = useState(`Страница ${pageNum + 1}`);

  const pagesInfo = useRef();

  const pages = [
    'Страница 1',
    'Страница 2',
    'Страница 3',
    'Страница 4',
    'Страница 5',
    'Страница 6',
    'Страница 7',
    'Страница 8',
    'Страница 9',
    'Страница 10',
    'Страница 11',
    'Страница 12',
    'Страница 13',
    'Страница 14',
    'Страница 15',
    'Страница 16',
    'Страница 17',
    'Страница 18',
    'Страница 19',
    'Страница 20',
    'Страница 21',
    'Страница 22',
    'Страница 23',
    'Страница 24',
    'Страница 25',
    'Страница 26',
    'Страница 27',
    'Страница 28',
    'Страница 29',
    'Страница 30',
  ];
  const pagesClasses = [cl.pages];

  if (isPageEasy) {
    pagesClasses.push(cl.easy);
  }

  useOnClickOutside(pagesInfo, () => setIsPagesVisibleVisible(false));

  const changePage = (idx, page) => {
    setPageNum(idx);
    setPageTitle(page);
  };

  const switchToNextPage = () => {
    if (pageNum < 29) {
      const nextPage = pageNum + 1;
      setPageNum(nextPage);
      setPageTitle(`Страница ${nextPage + 1}`);
    }
  };

  const switchToPrevPage = () => {
    if (pageNum > 0) {
      const prevPage = pageNum - 1;
      setPageNum(prevPage);
      setPageTitle(`Страница ${prevPage + 1}`);
    }
  };

  return (
    <div className={cl.pagination}>
      <button className={cl.prev} onClick={switchToPrevPage}>
        &#60;
      </button>
      <div
        className={pagesClasses.join(' ')}
        ref={pagesInfo}
        role="button"
        onClick={() => setIsPagesVisibleVisible(true)}
        onKeyDown={() => setIsPagesVisibleVisible(true)}
        tabIndex={0}
      >
        <span>{pageTitle}</span>
        <PopUp posY="4.3rem" posX="8rem" isVisible={isPagesVisible}>
          <div className={cl.buttons}>
            {pages.map((page, idx) => {
              return (
                <button key={page} className={cl.page} onClick={() => changePage(idx, page)}>
                  {page}
                </button>
              );
            })}
          </div>
        </PopUp>
      </div>
      <button className={cl.next} onClick={switchToNextPage}>
        &#62;
      </button>
    </div>
  );
}

export default Pagination;
