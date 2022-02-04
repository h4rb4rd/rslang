import React from 'react';

// styles
import cl from './WordCards.module.scss';

// components
import WordCard from '../WordCard/WordCard';

function WordCards({ words, isTranslate, groupNum }) {
  return (
    <div className={cl.cards}>
      {words.length ? (
        words.map((word) => {
          return (
            <WordCard
              key={word._id}
              word={word.word}
              wordId={word._id}
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
              groupNum={groupNum}
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
