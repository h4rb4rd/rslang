import React, { useContext, useState, useRef } from 'react';
import AuthContext from '../../context';
import { logout } from '../../utils/firebase';

// styles
import cl from './User.module.scss';

// hooks
import useOnClickOutside from '../../hooks/useOnClickOutside';

// components
import Avatar from '../Avatar';
import PopUp from '../UI/PopUp';
import MyButton from '../UI/MyButton';

function User({ openUserInfo, closeUserInfo, isVisible }) {
  const currentUser = useContext(AuthContext);
  const userInfo = useRef();

  const [loading, setLoading] = useState(false);

  const hadnleLogout = async () => {
    setLoading(true);

    try {
      await logout();
    } catch (err) {
      throw new Error(err);
    }

    setLoading(false);
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
        <div className={cl.email}>{currentUser.email}</div>
        <MyButton onClick={hadnleLogout} disabled={loading} btnColor="blue">
          Выйти
        </MyButton>
      </PopUp>
      <Avatar />
    </div>
  );
}

export default User;
