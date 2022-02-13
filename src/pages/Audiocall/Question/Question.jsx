import React, { useState, useEffect } from 'react';
import ApiService from '../../../services/ApiService';
import shuffleArray from '../../../utils/shuffleArray';
import AnswerBtn from '../AnswerBtn/AnswerBtn';
import Preloader from '../../../components/Preloader/Preloader';

import cl from './Question.module.scss';

function Question({ rightAnswer, wrongAnswers, setWordIndex, setScore }) {
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);

  const playWordAudio = () => {
    const wordAudio = new Audio();
    wordAudio.src = `${ApiService.API_URL}/${rightAnswer.audio}`;
    wordAudio.play();
  };

  const shuffledAllAnswers = shuffleArray(
    wrongAnswers
      .map((wrongAnswer) => {
        return {
          id: wrongAnswer.id || wrongAnswer._id,
          wordTranslate: wrongAnswer.wordTranslate,
          isRightAnswer: false,
        };
      })
      .concat({
        id: rightAnswer.id || rightAnswer._id,
        wordTranslate: rightAnswer.wordTranslate,
        isRightAnswer: true,
      })
  );

  const answerBtns = shuffledAllAnswers.map((answer, i) => {
    return (
      <AnswerBtn
        className={cl['answer-btn']}
        text={answer.wordTranslate}
        id={answer.id}
        isRightAnswer={answer.isRightAnswer}
        index={i + 1}
        key={answer.id}
      />
    );
  });

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
      <div className={cl['answer-btns-container']}>{answerBtns}</div>
      <button className={cl['skip-btn']}>I don&apos;t know</button>
    </div>
  );
}

export default Question;
