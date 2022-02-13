import React, { useState } from 'react';
import rightSound from '../../../assets/audio/right.mp3';
import wrongSound from '../../../assets/audio/wrong.mp3';

// styles
import cl from './AnswerBtn.module.scss';

function AnswerBtn({ text, id, isRightAnswer, index, setIsQuestionAnswered, score, setScore }) {
  const [isAnswerClicked, setIsAnswerClicked] = useState(false);

  const playAudio = (result) => {
    const audio = new Audio();
    audio.src = result === 'right' ? rightSound : wrongSound;
    audio.play();
  };

  const showResult = () => {
    if (isRightAnswer) {
      setScore(score + 1);
      playAudio('right');
    } else {
      playAudio('wrong');
    }
    setIsAnswerClicked(true);
    setIsQuestionAnswered(true);
  };

  const getButtonClass = () => {
    let className = `${cl.btn} `;
    if (isAnswerClicked) {
      className += isRightAnswer ? `${cl.right} ` : `${cl.wrong} `;
    }
    return className;
  };

  return (
    <button className={getButtonClass()} onClick={showResult}>
      {index}. {text}
    </button>
  );
}

export default AnswerBtn;
