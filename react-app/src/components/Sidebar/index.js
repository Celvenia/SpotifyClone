import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getPlaylists, createAPlaylist } from '../../store/playlists';
import { getSongs } from '../../store/songs';
import { getUsers } from '../../store/users';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faHouse,
  faPlus,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

import SidebarPlaylist from '../SidebarPlaylist';
import './Sidebar.css';


const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser?.id;
  const playlistObj = useSelector((state) => state.playlistReducer);
  const playlistArr = Object.values(playlistObj);


  useEffect(() => {
    dispatch(getSongs());
    dispatch(getUsers())
    if (userId) {
      dispatch(getPlaylists());
    }
  }, [dispatch, userId]);

  const handleCreatePlaylistClick = async (e) => {
    e.preventDefault();
    try {
      if (!sessionUser) alert("Log In To Create Playlist")
      else {
        const playlist = await dispatch(createAPlaylist())
        await history.push(`/playlists/${playlist.id}`);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="sidebar">
      <img
        className="sidebar-logo"
        src="https://res.cloudinary.com/dtzv3fsas/image/upload/v1683932465/SpotifyClone/Spotify_Logo_RGB_White_etpfol.png"
        alt=""
      />

      <ul className="sidebar-nav">
        <li className="sidebar-nav-item">
          <NavLink className="sidebar-nav-link" exact to="/">
            <FontAwesomeIcon icon={faHouse} /> Home
          </NavLink>
        </li>
        <li className="sidebar-nav-item">
          <NavLink className="sidebar-nav-link" exact to="/search">
            <FontAwesomeIcon icon={faSearch} /> Search
          </NavLink>
        </li>
      </ul>
      <ul className="sidebar-nav">
        <li className="sidebar-nav-item">
          <FontAwesomeIcon icon={faBook} /> Your Library
        </li>
        <li className="sidebar-nav-item sidebar-nav-link">
          <div
            className="sidebar-nav-item sidebar-nav-link"
            onClick={handleCreatePlaylistClick}
          >
            <FontAwesomeIcon icon={faPlus} /> Playlists
          </div>
        </li>
      </ul>

      {/* <strong className="sidebar-section-title">PLAYLISTS</strong> */}

      <div className="sidebar-section">
        {/* <hr /> */}
        {sessionUser && playlistArr.length
          ? playlistArr?.map((playlist) => (
            <SidebarPlaylist
              playlist={playlist}
              key={playlist.id}
            />
          ))
          : ''}
      </div>
    </div>
  );
};

export default Sidebar;