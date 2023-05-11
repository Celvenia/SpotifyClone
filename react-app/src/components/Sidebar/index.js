import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Playlist from '../Playlist';
import { getPlaylists } from '../../store/playlists';
import { getSongs } from '../../store/songs';
import { getAlbums, getLikedAlbums } from '../../store/albums';
import { useDispatch, useSelector } from 'react-redux';
import './Sidebar.css'
import SidebarPlaylist from '../SidebarPlaylist';

const Sidebar = ({ isLoaded }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser?.id
    const playlistObj = useSelector(state => state.playlistReducer)
    const playlistArr = Object.values(playlistObj)

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
              className="sidebar-logo"
              src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
              alt=""
            />

            <ul className="sidebar-nav">
                <li className="sidebar-nav-item">
                    <NavLink exact to="/" activeClassName="active">Home</NavLink>
                </li>
                <li className="sidebar-nav-item">
                    <NavLink exact to="/search" activeClassName="active">Search</NavLink>
                </li>
            </ul>

            <hr />

            <div className="sidebar-section">
                <div className="sidebar-section-title">Your Library</div>
                <br />
                <strong className="sidebar-section-title">PLAYLISTS</strong>
                <hr />
                {playlistArr?.map((playlist) => (
                    <SidebarPlaylist playlist={playlist} key={playlist.id} />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
