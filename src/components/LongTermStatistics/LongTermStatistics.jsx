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
          const learnedWordsCount = data[key]?.learnedWords || 0;
          const audiocallNewWords = data[key]?.statistics?.audiocall?.newWord || 0;
          const sprintNewWords = data[key]?.statistics?.sprint?.newWord || 0;
          const newWordsCount = audiocallNewWords + sprintNewWords;

          newWordsArr.push(newWordsCount);
          learndWordsArr.push(learnedWordsCount);
        } else {
          newWordsArr.push(0);
          learndWordsArr.push(0);
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

        if (statistics && easyWords) {
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
        if (statistics && easyWords && err.status === 404) {
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
  }, [statistics, easyWords]);

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
          'rgba(28, 176, 246, 0.7)',
          'rgba(28, 176, 246, 0.7)',
          'rgba(28, 176, 246, 0.7)',
          'rgba(28, 176, 246, 0.7)',
          'rgba(28, 176, 246, 0.7)',
          'rgba(28, 176, 246, 0.7)',
          'rgba(28, 176, 246, 0.7)',
        ],
        borderColor: [
          'rgba(28, 176, 246, 1)',
          'rgba(28, 176, 246, 1)',
          'rgba(28, 176, 246, 1)',
          'rgba(28, 176, 246, 1)',
          'rgba(28, 176, 246, 1)',
          'rgba(28, 176, 246, 1)',
          'rgba(28, 176, 246, 1)',
        ],
        borderWidth: 2,
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
          'rgba(28, 176, 246, 0.7)',
          'rgba(28, 176, 246, 0.7)',
          'rgba(28, 176, 246, 0.7)',
          'rgba(28, 176, 246, 0.7)',
          'rgba(28, 176, 246, 0.7)',
          'rgba(28, 176, 246, 0.7)',
          'rgba(28, 176, 246, 0.7)',
        ],
        borderColor: [
          'rgba(28, 176, 246, 1)',
          'rgba(28, 176, 246, 1)',
          'rgba(28, 176, 246, 1)',
          'rgba(28, 176, 246, 1)',
          'rgba(28, 176, 246, 1)',
          'rgba(28, 176, 246, 1)',
          'rgba(28, 176, 246, 1)',
        ],
        borderWidth: 2,
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
