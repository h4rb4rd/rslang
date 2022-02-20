import React, { useState, useEffect } from 'react';
import ApiService from '../../../../services/ApiService';
import shuffleArray from '../../../../utils/shuffleArray';
import AnswerBtn from '../AnswerBtn/AnswerBtn';
import Preloader from '../../../../components/Preloader/Preloader';

// styles
import cl from './Question.module.scss';

function Question({ rightAnswer, wrongAnswers, wordIndex, saveResult, showNextQuestion }) {
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
  const [allAnswers, setAllAnswers] = useState(null);

  const playWordAudio = () => {
    const wordAudio = new Audio();
    wordAudio.src = `${ApiService.API_URL}/${rightAnswer?.audio}`;
    wordAudio.play();
  };

  const renderAllAnswers = () => {
    const shuffledAnswerList = shuffleArray(
      wrongAnswers
        .map((wrongAnswer) => {
          return {
            wordTranslate: wrongAnswer?.wordTranslate,
            isAnswerCorrect: false,
          };
        })
        .concat({
          wordTranslate: rightAnswer?.wordTranslate,
          isAnswerCorrect: true,
        })
    );
    setAllAnswers(shuffledAnswerList);
  };

  useEffect(() => {
    renderAllAnswers();
    playWordAudio();
    setIsQuestionAnswered(false);
  }, [wordIndex]);

  const checkAnswer = (isAnswerCorrect) => {
    saveResult(isAnswerCorrect);
    setIsQuestionAnswered(true);
  };

  return (
    <div className={cl['question-wrapper']}>
      <div className={cl['media-wrapper']}>
        {isQuestionAnswered && (
          <div className={cl.image}>
            <img src={`${ApiService.API_URL}/${rightAnswer.image}`} alt="question-img" />
          </div>
        )}
        <button className={cl['audio-btn']} onClick={playWordAudio}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        </button>
      </div>
      {allAnswers ? (
        <div
          className={`${cl['answer-btns-container']} ${isQuestionAnswered ? `${cl.disabled}` : ''}`}
        >
          {allAnswers.map((answer, i) => {
            return (
              <AnswerBtn
                text={answer?.wordTranslate}
                isAnswerCorrect={answer.isAnswerCorrect}
                index={i + 1}
                key={answer?.wordTranslate}
                wordIndex={wordIndex}
                checkAnswer={checkAnswer}
                showNextQuestion={showNextQuestion}
              />
            );
          })}
        </div>
      ) : (
        <Preloader />
      )}
      <button onClick={showNextQuestion} className={cl['next-btn']}>
        {isQuestionAnswered ? 'Следующий' : `Я не знаю`}
      </button>
    </div>
  );
}

export default Question;
