import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import ApiService from '../../services/ApiService';

import cl from './LongTermStatistics.module.scss';

function LongTermStatistics() {
  const [userSettings, setUserSettings] = useState({});
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    ApiService.getUserSettings(userId, setUserSettings);
  }, []);

  console.log(userSettings);
  return <div>{/* bar place */}</div>;
}

export default LongTermStatistics;
