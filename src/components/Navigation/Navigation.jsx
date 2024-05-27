import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css'

const Navigation = () => (
  <nav className={css.navStyle}>
    <NavLink className={css.linkStyle} exact to="/">Home</NavLink>
    <NavLink className={css.linkStyle} to="/movies">Movies</NavLink>
  </nav>
);

export default Navigation;
