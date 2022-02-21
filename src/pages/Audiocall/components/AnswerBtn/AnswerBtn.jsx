import React, { useEffect, useState } from 'react';

// styles
import cl from './AnswerBtn.module.scss';

function AnswerBtn({ text, isAnswerCorrect, index, wordIndex, checkAnswer, showNextQuestion }) {
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

  const handleKeyDown = (e) => {
    if (e.key === index.toString()) {
      showAnswerResult();
      setTimeout(() => showNextQuestion(), 500);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, { once: true });
  }, []);

  return (
    <button className={getButtonClass()} onClick={() => showAnswerResult()}>
      {index}. {text}
    </button>
  );
}

export default AnswerBtn;
