import React from 'react';
import { NavLink } from 'react-router-dom';

// styles
import cl from './Navbar.module.scss';

function Navbar() {
  return (
    <nav className={cl.navbar}>
      <NavLink to="/" className={(navData) => (navData.isActive ? `${cl.active}` : '')}>
        Page 1
      </NavLink>
      <NavLink to="/page2" className={(navData) => (navData.isActive ? `${cl.active}` : '')}>
        Page 2
      </NavLink>
      <NavLink to="/page3" className={(navData) => (navData.isActive ? `${cl.active}` : '')}>
        Page 3
      </NavLink>
    </nav>
  );
}

export default Navbar;
