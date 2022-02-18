import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';

// styles
import cl from './Statistics.module.scss';

// components
import ShortTermStatistics from '../../components/ShortTermStatistics/ShortTermStatistics';
import LongTermStatistics from '../../components/LongTermStatistics/LongTermStatistics';

function Statistics() {
  const [statistics, setStatistics] = useState(null);
  const [statisticType, setStatisticType] = useState('short');

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    ApiService.getStatistics(userId, setStatistics);
  }, []);

  return (
    <div className={cl.statistics}>
      <div className={cl.content}>
        <h2 className={cl.title}>Статистика</h2>
        {statisticType === 'short' ? (
          <ShortTermStatistics statistics={statistics} />
        ) : (
          <LongTermStatistics statistics={statistics} />
        )}
      </div>
    </div>
  );
}

export default Statistics;
