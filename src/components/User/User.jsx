import React, { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchUser } from '../../services/fetchService';

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
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const userInfo = useRef();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchUser(userId, setUserData);
  }, []);

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
