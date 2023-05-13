import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getPlaylists, createAPlaylist } from '../../store/playlists';
import { getSongs } from '../../store/songs';
import { getAlbums, getLikedAlbums } from '../../store/albums';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faSearch } from '@fortawesome/free-solid-svg-icons'

import SidebarPlaylist from '../SidebarPlaylist';
import './Sidebar.css'
import { getFollowers } from '../../store/followers';


const Sidebar = ({ isLoaded }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);
  const userId = sessionUser?.id
  const playlistObj = useSelector(state => state.playlistReducer)
  const playlistArr = Object.values(playlistObj)
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState([]);

  useEffect(()=> {
    dispatch(getFollowers(userId))
  },[dispatch])


  useEffect(() => {
    dispatch(getSongs())
    dispatch(getAlbums())
    if (userId) {
      dispatch(getPlaylists())
    }
    if (userId) {
      dispatch(getLikedAlbums(userId))
    }
  }, [dispatch, userId])


  const handleCreatePlaylistClick = async (e) => {
    e.preventDefault();

    let playlist;
    try {
      playlist = await dispatch(createAPlaylist())
    } catch (err) {
      alert(err)
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
          <FontAwesomeIcon icon={faHouse} />
          <NavLink className="sidebar-nav-link" exact to="/">Home</NavLink>
        </li>
        <li className="sidebar-nav-item">
          <FontAwesomeIcon icon={faSearch} />
          <NavLink className="sidebar-nav-link" exact to="/search">Search</NavLink>
        </li>
      </ul>

        <h3>Your Library</h3>
        <br />
        <strong className="sidebar-section-title">PLAYLISTS</strong>
        <button onClick={handleCreatePlaylistClick}>Create Playlist</button>
      <div className="sidebar-section">
        <hr />
        {playlistArr.length ? playlistArr?.map((playlist) => (
          <SidebarPlaylist playlist={playlist} key={playlist.id} />
        )
        ) : ""}
      </div>
    </div>
  );
};

export default Sidebar;
