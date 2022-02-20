import React, { useEffect, useState, useMemo } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

import ApiService from '../../services/ApiService';

import cl from './LongTermStatistics.module.scss';

function LongTermStatistics() {
  const [userSettings, setUserSettings] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [easyWords, setEasyWords] = useState(null);
  const [newWords, setNewWords] = useState([]);
  const [learnedWords, setLearnedWords] = useState([]);
  const [statisticsType, setStatisticsType] = useState('new');

  const userId = localStorage.getItem('userId');
  const week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const date = new Date();
  const dayNum = date.getDay();
  const day = week[dayNum];

  function addWordsData(data) {
    const newWordsArr = [];
    const learndWordsArr = [];

    if (data) {
      week.forEach((key) => {
        if (data && key in data) {
          const learnedWordsCount = data[key].learnedWords;
          const audiocallNewWords = data[key].statistics?.audiocall?.newWord || 0;
          const sprintNewWords = data[key].statistics?.sprint?.newWord || 0;
          const newWordsCount = audiocallNewWords + sprintNewWords;
          newWordsArr.push(newWordsCount);
          learndWordsArr.push(learnedWordsCount);
        }
      });
    }
    setLearnedWords(learndWordsArr);
    setNewWords(newWordsArr);
  }

  useEffect(() => {
    ApiService.getStatistics(userId, setStatistics).catch((err) =>
      console.log('getStatistics: ', err.statusText)
    );
    ApiService.getEasyWords(userId, setEasyWords).catch((err) =>
      console.log('getEasyWords: ', err.statusText)
    );
  }, []);

  function updateDailyStatistics() {
    ApiService.getUserSettings(userId, setUserSettings)
      .then((res) => {
        const prevOptional = res.data.optional || {};

        if (statistics) {
          const options = {
            dayNum,
            [day]: {
              statistics: statistics?.optional,
              learnedWords: easyWords?.length || 0,
            },
          };
          const optional = Object.assign(prevOptional, options);
          ApiService.updateUserSettings(userId, optional).then(() => {
            setUserSettings({ ...res.data, optional });
            addWordsData(res.data.optional);

            if (res.data.optional.dayNum !== dayNum) {
              ApiService.updateUserStatistic(userId, 0, {});
            }
          });
        }
      })
      .catch((err) => {
        if (statistics && err.status === 404) {
          const optional = {
            dayNum,
            [day]: {
              statistics: statistics?.optional,
              learnedWords: easyWords?.length || 0,
            },
          };

          ApiService.updateUserSettings(userId, optional).then(() => {
            setUserSettings(optional);
            addWordsData(optional);
          });
        }
      });
  }

  useEffect(() => {
    updateDailyStatistics();
  }, [statistics]);

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 20,
          },
        },
      },
    },
  };

  const newWordsChart = {
    labels: week,
    datasets: [
      {
        label: 'Количество новых слов',
        data: newWords,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const LearnedWordsChart = {
    labels: week,
    datasets: [
      {
        label: 'Количества изученных слов',
        data: learnedWords,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={cl.statistics}>
      <div className={cl.navbar}>
        <button
          onClick={() => setStatisticsType('new')}
          className={statisticsType === 'new' ? cl.active : undefined}
        >
          Новые слова
        </button>
        <button
          onClick={() => setStatisticsType('learned')}
          className={statisticsType === 'learned' ? cl.active : undefined}
        >
          Изученные слова
        </button>
      </div>
      {statisticsType === 'new' && (
        <div className={cl.new}>
          <Bar data={newWordsChart} options={options} />
        </div>
      )}
      {statisticsType === 'learned' && (
        <div className={cl.learned}>
          <Bar data={LearnedWordsChart} options={options} />
        </div>
      )}
    </div>
  );
}

export default LongTermStatistics;
