import React, { useContext } from 'react';
import AuthContext from '../../context';

// styles
import cl from './WordCards.module.scss';

// components
import WordCard from '../WordCard/WordCard';

function WordCards({ words, isTranslate, pageNum, groupNum, setWords }) {
  const { isAuth } = useContext(AuthContext);

  return (
    <div className={cl.cards}>
      {words?.length ? (
        words.map((word) => {
          return (
            <WordCard
              key={isAuth ? word._id : word.id}
              word={word.word}
              wordId={isAuth ? word._id : word.id}
              wordTranslate={word.wordTranslate}
              transcription={word.transcription}
              textMeaning={word.textMeaning}
              textMeaningTranslate={word.textMeaningTranslate}
              textExample={word.textExample}
              textExampleTranslate={word.textExampleTranslate}
              image={word.image}
              audio={word.audio}
              audioExample={word.audioExample}
              audioMeaning={word.audioMeaning}
              userWord={word.userWord}
              isTranslate={isTranslate}
              pageNum={pageNum}
              groupNum={groupNum}
              setWords={setWords}
            />
          );
        })
      ) : (
        <EmptyData />
      )}
    </div>
  );
}

function EmptyData() {
  return (
    <div className={cl.empty}>
      <span>В данном разделе пока пусто!</span>
    </div>
  );
}

export default WordCards;
