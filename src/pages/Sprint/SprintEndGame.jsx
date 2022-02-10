import React from 'react';

function SprintEndGame({ wordsList, score, tryAgain }) {
  const wordsErrorList = wordsList.filter((word) => !word.option.countRight);
  const wordsRightList = wordsList.filter((word) => word.option.countRight);
  return (
    <div onClick={() => tryAgain(0)}>
      <div>
        <div>Mistakes</div>
        {wordsErrorList.map((word) => (
          <div>{word.word}</div>
        ))}
      </div>
      <div>
        <div>Right</div>
        {wordsRightList.map((word) => (
          <div>{word.word}</div>
        ))}
      </div>
    </div>
  );
}

export default SprintEndGame;
