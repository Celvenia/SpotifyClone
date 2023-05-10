import React from 'react';
import { NavLink } from 'react-router-dom';
import './LibraryNav.css';

const LibraryNav = () => {
  return (
    <nav className='library-nav'>
      <div>
        <span className='library-nav-item'>
          <NavLink to={`/playlists/${1}`} className='link'>
            Playlists
          </NavLink>
        </span>
        <span className='library-nav-item'>
          <NavLink to={`/users/${5}`} className='link'>
            Artists
          </NavLink>
        </span>
        <span className='library-nav-item'>
          <NavLink to={`/albums/${1}`} className='link'>
            Albums
          </NavLink>
        </span>
      </div>
        <div className='library-block-container'>
            Testing this out
        </div>
    </nav>
  );
};

export default LibraryNav;