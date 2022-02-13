import React, { useState, useContext } from 'react';
import Final from '../Final/Final';
import Question from '../Question/Question';
import Preloader from '../../../../components/Preloader/Preloader';
import AuthContext from '../../../../context/index.js';

// helpers
import { MAX_WORDS_COUNT, WRONG_ANSWERS_COUNT } from '../../helper';
import shuffleArray from '../../../../utils/shuffleArray';

// sounds
import WrongSoundFile from '../../../../assets/audio/wrong.mp3';
import RightSoundFile from '../../../../assets/audio/right.mp3';
import FinalSoundFile from '../../../../assets/audio/final.mp3';

// styles
import cl from './Level.module.scss';

const wrongSound = new Audio(WrongSoundFile);
wrongSound.volume = 1;
const rightSound = new Audio(RightSoundFile);
rightSound.volume = 1;
const finalSound = new Audio(FinalSoundFile);
finalSound.volume = 1;

function Level({ words, tryAgain, statistic }) {
  const { isAuth } = useContext(AuthContext);
  const [wordIndex, setWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [tempRow, setTempRow] = useState(0);
  const [maxRow, setMaxRow] = useState(0);

  console.log(words);

  const getWrongAnswers = (wordList) => {
    return shuffleArray(wordList.filter((word) => word.id !== words[wordIndex].id)).slice(
      0,
      WRONG_ANSWERS_COUNT
    );
  };

  const saveCorrectResultInStore = () => {
    const correct = words[wordIndex].options.statistics?.correct || 0;
    words[wordIndex].options.statistics.correct = correct + 1;
    if (words[wordIndex].options.statistics.row) {
      const { row } = words[wordIndex].options.statistics.row;
      words[wordIndex].options.statistics.row = row + 1;
    }
  };

  const saveWrongResultInStore = () => {
    const wrong = words[wordIndex].options.statistics?.wrong || 0;
    words[wordIndex].options.statistics.wrong = wrong + 1;
    if (words[wordIndex].options.statistics.row) {
      words[wordIndex].options.statistics.row = 0;
    }
  };

  const saveResultInStore = (isAnswerCorrect) => {
    if (isAnswerCorrect) {
      saveCorrectResultInStore();
    } else {
      saveWrongResultInStore();
    }
  };

  const saveResult = (isAnswerCorrect) => {
    if (isAnswerCorrect) {
      setScore(score + 1);
      setTempRow(tempRow + 1);
      rightSound.play();
    } else {
      if (tempRow > maxRow) {
        setMaxRow(tempRow);
      }
      setTempRow(0);
      wrongSound.play();
    }
    if (isAuth) saveResultInStore(isAnswerCorrect);
  };

  const showNextQuestion = () => {
    setWordIndex(wordIndex + 1);
    if (wordIndex === MAX_WORDS_COUNT - 1) {
      setIsEnd(true);
      finalSound.play();
    }
  };

  return (
    <div className={cl.wrapper}>
      <div className={cl['quesion-num']}>
        <p>
          {wordIndex} / {MAX_WORDS_COUNT}
        </p>
      </div>
      {!isEnd ? (
        <div>
          {words ? (
            <Question
              rightAnswer={words[wordIndex]}
              wrongAnswers={getWrongAnswers(words)}
              wordIndex={wordIndex}
              saveResult={saveResult}
              showNextQuestion={showNextQuestion}
            />
          ) : (
            <Preloader />
          )}
        </div>
      ) : (
        <Final
          words={words}
          score={score}
          tryAgain={tryAgain}
          maxRow={maxRow}
          statistic={statistic}
        />
      )}
    </div>
  );
}

export default Level;
