import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// styles
import cl from './WordStatistics.module.scss';

function WordStatistics({ statistics, setIsModal }) {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [correctAnswersPercent, setCorrectAnswersPercent] = useState(0);

  useEffect(() => {
    setCorrectAnswers(statistics?.correct);
    setWrongAnswers(statistics?.wrong);
  }, []);

  function countCorrectAnswersPercent() {
    const totalAnswers = correctAnswers + wrongAnswers;
    const percent = totalAnswers ? Math.floor((correctAnswers * 100) / totalAnswers) : 0;
    setCorrectAnswersPercent(percent);
  }

  useEffect(() => {
    countCorrectAnswersPercent();
  }, [correctAnswers, wrongAnswers]);

  return (
    <div className={cl.statistics}>
      <h2 className={cl.title}>Процент правильных ответов:</h2>
      <div className={cl.progress}>
        <CircularProgressbar
          value={correctAnswersPercent}
          text={`${correctAnswersPercent}%`}
          styles={buildStyles({
            trailColor: '#c2c2c2',
            textColor: '#1caff6',
            pathColor: '#1caff6',
            textSize: '30px',
          })}
        />
      </div>
      <p>
        Количество правильных ответов: <span>{correctAnswers}</span>
      </p>
      <p>
        Количество ошибок: <span>{wrongAnswers}</span>
      </p>
      <button className={cl.close} onClick={() => setIsModal(false)}>
        &#10006;
      </button>
    </div>
  );
}

export default WordStatistics;
