import React from 'react';
import { NavLink } from 'react-router-dom';

// styles
import cl from './Navbar.module.scss';

function Navbar() {
  return (
    <nav className={cl.navbar}>
      <NavLink to="/textbook" className={(navData) => (navData.isActive ? `${cl.active}` : '')}>
        Учебник
      </NavLink>
      <NavLink to="/dictionary" className={(navData) => (navData.isActive ? `${cl.active}` : '')}>
        Словарь
      </NavLink>
      <NavLink to="/games" className={(navData) => (navData.isActive ? `${cl.active}` : '')}>
        Игры
      </NavLink>
      <NavLink to="/statistics" className={(navData) => (navData.isActive ? `${cl.active}` : '')}>
        Статистика
      </NavLink>
      <NavLink to="/team" className={(navData) => (navData.isActive ? `${cl.active}` : '')}>
        О команде
      </NavLink>
    </nav>
  );
}

export default Navbar;
