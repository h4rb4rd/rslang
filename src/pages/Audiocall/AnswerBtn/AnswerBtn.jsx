import React, { useEffect, useState } from 'react';

// styles
import cl from './AnswerBtn.module.scss';

function AnswerBtn({
  text,
  id,
  isRightAnswer,
  index,
  isQuestionAnswered,
  setIsQuestionAnswered,
  score,
  setScore,
}) {
  const [isAnswerClicked, setIsAnswerClicked] = useState(false);

  const showResult = () => {
    if (isRightAnswer) {
      setScore(score + 1);
    }
    setIsAnswerClicked(true);
    setIsQuestionAnswered(true);
  };

  const getButtonClass = () => {
    let className = `${cl.btn} `;
    if (isAnswerClicked) {
      className += isRightAnswer ? `${cl.right} ` : `${cl.wrong} `;
    }
    if (isQuestionAnswered) {
      className += `${cl.disabled}`;
    }
    return className;
  };

  return (
    <button className={getButtonClass()} onClick={showResult} disabled={isQuestionAnswered}>
      {index}. {text}
    </button>
  );
}

export default AnswerBtn;
