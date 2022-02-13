import React from 'react';

// styles
import cl from './AnswerBtn.module.scss';

function AnswerBtn({ text, id, isRightAnswer, index }) {
  return (
    <button className={cl.btn}>
      {index}. {text}
    </button>
  );
}

export default AnswerBtn;
