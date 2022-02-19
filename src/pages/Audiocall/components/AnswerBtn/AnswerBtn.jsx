import React, { useEffect, useState } from 'react';

// styles
import cl from './AnswerBtn.module.scss';

function AnswerBtn({ text, isAnswerCorrect, index, wordIndex, checkAnswer }) {
  const [isBtnClicked, setIsBtnClicked] = useState(false);

  useEffect(() => {
    setIsBtnClicked(false);
  }, [wordIndex]);

  const getButtonClass = () => {
    let className = `${cl.btn} `;
    if (isBtnClicked) {
      className += isAnswerCorrect ? `${cl.right} ` : `${cl.wrong} `;
    }
    return className;
  };

  const showAnswerResult = () => {
    setIsBtnClicked(true);
    checkAnswer(isAnswerCorrect);
  };

  return (
    <button className={getButtonClass()} onClick={() => showAnswerResult()}>
      {index}. {text}
    </button>
  );
}

export default AnswerBtn;
