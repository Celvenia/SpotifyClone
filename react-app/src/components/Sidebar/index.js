import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Playlist from '../Playlist';
import { getPlaylists } from '../../store/playlists';
import { getSongs } from '../../store/songs';
import { getAlbums, getLikedAlbums } from '../../store/albums';
import { useDispatch, useSelector } from 'react-redux';
import './Sidebar.css'

const Sidebar = ({ isLoaded }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser?.id
    // const songsObj = useSelector(state => state.songReducer)
    // const songsArr = Object.values(songsObj);
    const playlistObj = useSelector(state => state.playlistReducer)
    const playlistArr = Object.values(playlistObj)
    // const albumsObj = useSelector(state => state.albumReducer)
    // const albumArr = Object.values(albumsObj)

    // console.log(songsArr)
    // console.log(playlistArr)

    useEffect(() => {
        dispatch(getSongs())
        dispatch(getPlaylists())
        dispatch(getAlbums())
    }, [dispatch])

    useEffect(() => {
        if (userId) {
            dispatch(getLikedAlbums(userId))
        }

    },[dispatch, userId])

    return (
        <div className="sidebar">
        <img
          className="sidebar_logo"
          src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
          alt=""
        />
        
				<NavLink exact to="/">Home</NavLink>
				<NavLink exact to="/search">Search</NavLink>
			
        <div> Your Library </div>
        <br />
        <strong className="sidebar_title">PLAYLISTS</strong>
        <hr />
        {playlistArr?.map((playlist) => (
          <NavLink exact to={`/playlists/${playlist.id}`}>
            <div> {playlist.title} </div>
          </NavLink>
        ))}
      </div>

      );
};

export default Sidebar;