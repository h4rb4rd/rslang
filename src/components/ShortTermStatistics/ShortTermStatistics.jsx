import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// styles
import cl from './ShortTermStatistics.module.scss';

function ShortTermStatistics({ statistics }) {
  return (
    <div className={cl.shortStatistics}>
      <Statistics title="Спринт" statistics={statistics?.optional?.sprint} />
      <Statistics title="Аудиовызов" statistics={statistics?.optional?.audiocall} />
    </div>
  );
}

function Statistics({ title, statistics }) {
  const [correctAnswersPercent, setCorrectAnswersPercent] = useState(0);
  const correctAnswers = statistics?.correct || 0;
  const wrongAnswers = statistics?.wrong || 0;

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
      <h2 className={cl.title}>{title}</h2>
      <h3 className={cl.subtitle}>Процент правильных ответов:</h3>
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
        Количество новых слов за день: <span>{statistics?.newWord || 0}</span>
      </p>
      <p>
        Самая длинная серия правильных ответов: <span>{statistics?.row || 0}</span>
      </p>
    </div>
  );
}

export default ShortTermStatistics;
