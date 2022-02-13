import React, { useEffect, useState } from 'react';
import ApiService from '../../../services/ApiService';
import { MAX_WORDS_COUNT } from '../../../constants';
import getRandomNum from '../../../utils/getRandomNum';
import shuffleArray from '../../../utils/shuffleArray';
import Preloader from '../../../components/Preloader/Preloader';

// styles
import cl from './Level.module.scss';
import Question from '../Question/Question';

function Level({ levelNumber }) {
  const [words, setWords] = useState(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [score, setScore] = useState(0);

  const userId = localStorage.getItem('userId');
  const pageNum = getRandomNum(0, 29);

  const shuffleWordList = (wordList) => {
    setWords(shuffleArray(wordList));
  };

  const getWords = () => {
    if (!userId) {
      ApiService.getUnauthorizedWords(levelNumber, pageNum, shuffleWordList);
    } else {
      ApiService.getWords(userId, levelNumber, pageNum, MAX_WORDS_COUNT, shuffleWordList);
    }
  };

  useEffect(() => {
    getWords();
  }, []);

  const getWrongAnswers = (wordList) => {
    return shuffleArray(wordList.filter((word) => word.id !== words[wordIndex].id)).slice(0, 3);
  };

  return (
    <div className={cl.wrapper}>
      <div className={cl.score}>
        <p> {score} / 20 </p>
      </div>
      {words ? (
        <Question
          rightAnswer={words[wordIndex]}
          wrongAnswers={getWrongAnswers(words)}
          setWordIndex={setWordIndex}
          setScore={setScore}
        />
      ) : (
        <Preloader />
      )}
    </div>
  );
}

export default Level;
