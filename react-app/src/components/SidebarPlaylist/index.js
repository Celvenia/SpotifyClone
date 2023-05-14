import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getPlaylists } from '../../store/playlists';
import { getSongs } from '../../store/songs';
import { getAlbums, getLikedAlbums } from '../../store/albums';
import './SidebarPlaylist.css';
import { useDispatch } from 'react-redux';

export default function SidebarPlaylist({ playlist }) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getSongs());
		dispatch(getPlaylists());
		// dispatch(getAlbums())
	}, [dispatch]);

	return (
		<div className="sidebar-block" title={playlist.title}>
			<NavLink exact to={`/playlists/${playlist.id}`}>
				<div className="sidebar-block-left">
					<img
						src={playlist.tile_image_url}
						alt="Liked Songs"
						className="sidebar-block-image"
					/>
				</div>

				<div className="sidebar-block-right">
					<br />
					<span className="playlist-title">{playlist.title}</span>
					<br />
					<span className="playlist-description">
            Playlist · {playlist.songs?.length} Songs
					</span>
				</div>
			</NavLink>
		</div>
	);
}
