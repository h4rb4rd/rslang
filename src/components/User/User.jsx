import React, { useState, useRef, useContext, useEffect } from 'react';
import axios from 'axios';
// styles
import cl from './User.module.scss';

// hooks
import useOnClickOutside from '../../hooks/useOnClickOutside';

// components
import Avatar from '../Avatar';
import PopUp from '../UI/PopUp';
import MyButton from '../UI/MyButton';
import AuthContext from '../../context';
import ApiSerives from '../../services/ApiService';

function User({ openUserInfo, closeUserInfo, isVisible }) {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const userInfo = useRef();

  useEffect(async () => {
    const userId = localStorage.getItem('userId');

    try {
      const response = await ApiSerives.getUser(userId);
      setUserData(response.data);
    } catch (err) {
      if (err.response.status === 401) {
        console.log('Пользователь не авторизован!');
      }
    }
  }, []);

  const hadnleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
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
        <div className={cl.name}>{userData?.name}</div>
        <MyButton onClick={hadnleLogout} btnColor="blue">
          Выйти
        </MyButton>
      </PopUp>
      <Avatar />
    </div>
  );
}

export default User;
