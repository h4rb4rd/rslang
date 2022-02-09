import React from 'react';

// styles
import cl from './Sprint.module.scss';

function SprintWords({ word, translate }) {
  return (
    <div className={cl.wordWrapper}>
      <span>{word}</span> <span>{translate}</span>
    </div>
  );
}
export default SprintWords;
