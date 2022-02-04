import React from 'react';
import { NavLink, Link } from 'react-router-dom';

// styles
import cl from './Navbar.module.scss';

// components
import Logo from '../Logo';

function Navbar({ isBurgerOpen }) {
  const classes = [cl.navbar];

  if (isBurgerOpen) {
    classes.push(cl.active);
  }
  return (
    <nav className={classes.join(' ')}>
      <Link to="/textbook">
        <Logo />
      </Link>
      <div className={cl.links}>
        <NavLink to="/textbook" className={(navData) => (navData.isActive ? `${cl.active}` : '')}>
          Учебник
        </NavLink>
        <NavLink to="/games" className={(navData) => (navData.isActive ? `${cl.active}` : '')}>
          Мини игры
        </NavLink>
        <NavLink to="/statistics" className={(navData) => (navData.isActive ? `${cl.active}` : '')}>
          Статистика
        </NavLink>
        <NavLink to="/team" className={(navData) => (navData.isActive ? `${cl.active}` : '')}>
          О команде
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
