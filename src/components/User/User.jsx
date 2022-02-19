import React, { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ApiService from '../../services/ApiService';

// styles
import cl from './User.module.scss';

// hooks
import useOnClickOutside from '../../hooks/useOnClickOutside';

// components
import Avatar from '../Avatar';
import PopUp from '../UI/PopUp';
import MyButton from '../UI/MyButton';
import AuthContext from '../../context';

function User({ openUserInfo, closeUserInfo, isVisible }) {
  const { setIsAuth } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [userSettings, setUserSettings] = useState({});

  const navigate = useNavigate();
  const userInfo = useRef();
  const userId = localStorage.getItem('userId');

  const week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const date = new Date();
  const dayNum = date.getDay();
  const day = week[dayNum];
  const currentStatistics = statistics?.optional || {};

  useEffect(() => {
    ApiService.getStatistics(userId, setStatistics).catch((err) => console.log(err.statusText));
  }, []);

  function updateDailyStatistics() {
    ApiService.getUserSettings(userId, setUserSettings)
      .then(() => {
        if (userSettings?.optional?.dayNum !== dayNum) {
          const optional = {
            dayNum,
            dailyStatistics: {
              ...userSettings?.optional?.dailyStatistics,
              [day]: currentStatistics,
            },
          };

          ApiService.updateUserSettings(userId, optional).then(() => {
            setUserSettings({ ...userSettings, optional });
            ApiService.updateUserStatistic(userId, '', {});
          });
        }
      })
      .catch((err) => {
        if (err.status === 404) {
          const optional = {
            dayNum,
            dailyStatistics: {
              ...userSettings?.optional?.dailyStatistics,
              [day]: currentStatistics,
            },
          };

          ApiService.updateUserSettings(userId, optional).then(() => {
            setUserSettings({ ...userSettings, optional });
            ApiService.updateUserStatistic(userId, '', {});
          });
        }
      });
  }

  useEffect(() => {
    ApiService.getUser(userId, setUserData);
  }, []);

  useEffect(() => {
    updateDailyStatistics();
  }, [statistics]);

  const hadnleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
    navigate('/');
  };

  useOnClickOutside(userInfo, closeUserInfo);

  return (
    <div
      ref={userInfo}
      role="button"
      onClick={openUserInfo}
      onKeyDown={openUserInfo}
      tabIndex={0}
      className={cl.user}
    >
      <PopUp posY="5.6rem" posX="-1.8rem" isVisible={isVisible}>
        <Avatar />
        <div className={cl.name}>{userData?.name || 'Загрузка...'}</div>
        <MyButton onClick={hadnleLogout} btnColor="blue">
          Выйти
        </MyButton>
      </PopUp>
      <Avatar />
    </div>
  );
}

export default User;
