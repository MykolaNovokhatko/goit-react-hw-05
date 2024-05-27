import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <NavLink exact to="/">Home</NavLink>
    <NavLink to="/movies">Movies</NavLink>
  </nav>
);

export default Navigation;
