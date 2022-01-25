import React, { useState } from 'react';

// styles
import cl from './Header.module.scss';

// icons
import burgerOpen from '../../assets/header/burger-open.svg';
import burgerClose from '../../assets/header/burger-close.svg';

// components
import User from '../User/User';
import Navbar from '../Navbar/Navbar';

function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const openUserInfo = () => {
    setIsVisible(true);
  };

  const closeUserInfo = () => {
    setIsVisible(false);
  };

  return (
    <header className={cl.header}>
      <div className={cl.content}>
        <button
          className={cl.burger}
          onClick={() => {
            setIsBurgerOpen(!isBurgerOpen);
          }}
        >
          <img src={isBurgerOpen ? burgerClose : burgerOpen} alt="burger-menu" />
        </button>
        <Navbar isBurgerOpen={isBurgerOpen} />
        <User openUserInfo={openUserInfo} closeUserInfo={closeUserInfo} isVisible={isVisible} />
      </div>
    </header>
  );
}

export default Header;
