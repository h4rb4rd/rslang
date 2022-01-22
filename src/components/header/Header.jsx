import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// styles
import cl from './Header.module.scss';

// components
import User from '../User/User';
import Navbar from '../Navbar/Navbar';
import Logo from '../Logo';

function Header() {
  const [isVisible, setIsVisible] = useState(false);

  const openUserInfo = () => {
    setIsVisible(true);
  };
  const closeUserInfo = () => {
    setIsVisible(false);
  };

  return (
    <header className={cl.header}>
      <div className={cl.content}>
        <Link to="/">
          <Logo />
        </Link>
        <Navbar />
        <User openUserInfo={openUserInfo} closeUserInfo={closeUserInfo} isVisible={isVisible} />
      </div>
    </header>
  );
}

export default Header;
