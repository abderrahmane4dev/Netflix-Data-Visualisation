import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import "./style.css"
function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">10 Longest Movies/tvShows</Link></li> 
        <li> <Link to="/G2"> Top Countries "Movies/TvShows" </Link> </li>
        <li> <Link to="/G3"> Listed-in "Movies/TvShows" </Link> </li>
        <li> <Link to="/G4"> Release Year "Movies/TvShows" </Link> </li>
       
      </ul>
    </nav>
  );
}

export default Navbar;