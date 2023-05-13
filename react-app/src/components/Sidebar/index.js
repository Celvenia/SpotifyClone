import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { getPlaylists, createAPlaylist } from '../../store/playlists';
import { getSongs } from '../../store/songs';
import { getAlbums, getLikedAlbums } from '../../store/albums';
import { useDispatch, useSelector } from 'react-redux';
import './Sidebar.css';
import SidebarPlaylist from '../SidebarPlaylist';

const Sidebar = ({ isLoaded }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector((state) => state.session.user);
	const userId = sessionUser?.id;
	const playlistObj = useSelector((state) => state.playlistReducer);
	const playlistArr = Object.values(playlistObj);

	useEffect(() => {
		dispatch(getSongs());
		dispatch(getPlaylists());
		// dispatch(getAlbums())
	}, [dispatch]);

	useEffect(() => {
		if (userId) {
			dispatch(getLikedAlbums(userId));
		}
	}, [dispatch, userId]);

	const handleCreatePlaylistClick = async (e) => {
		e.preventDefault();

		let playlist;
		try {
			playlist = await dispatch(createAPlaylist());
		} catch (err) {
			alert(err);
		}
	};

	return (
		<div className="sidebar">
			<img
				className="sidebar-logo"
				src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
				alt=""
			/>

			<ul className="sidebar-nav">
				<div className="sidebar-nav-item">
					<svg
						height="24"
						width="24"
						className="home-icon"
						viewBox="0 0 24 24"
					>
						<path
							fill="currentColor"
							d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z"
						></path>
					</svg>
					{/* <svg
						height="24"
						width="24"
						className="home-active-icon"
						viewBox="0 0 24 24"
					>
						<path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z"></path>
					</svg> */}
					<NavLink exact to="/">
          {' '}Home
					</NavLink>
				</div>
				<div className="sidebar-nav-item">
					<svg
						className="svg-inline--fa fa-magnifying-glass "
						viewBox="0 0 512 512"
					>
						<path
							fill="currentColor"
							d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
						></path>
					</svg>
					<NavLink exact to="/search">
          {' '}Search
					</NavLink>
				</div>
			</ul>

			<hr />

			<div className="sidebar-section">
				<div className="sidebar-section-title">
					<svg
						height="24"
						width="24"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="library-icon"
					>
						<path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
					</svg>
					{' '}Your Library
				</div>
				<br />
				<strong className="sidebar-section-title">PLAYLISTS</strong>
				<button onClick={handleCreatePlaylistClick}>
					Create Playlist
				</button>
				<hr />
				{playlistArr?.map((playlist) => (
					<SidebarPlaylist playlist={playlist} key={playlist.id} />
				))}
			</div>
		</div>
	);
};

export default Sidebar;
