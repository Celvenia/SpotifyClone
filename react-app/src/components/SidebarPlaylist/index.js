import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { getPlaylists} from '../../store/playlists';
import { getSongs } from '../../store/songs';
import { getAlbums, getLikedAlbums } from '../../store/albums';
import './SidebarPlaylist.css'
import { useDispatch } from 'react-redux';

export default function SidebarPlaylist({ playlist }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSongs())
    dispatch(getPlaylists())
    // dispatch(getAlbums())
  }, [dispatch])


  return (
    <div className='sidebar-block' title={playlist.title}>
      <div>
        <NavLink exact to={`/playlists/${playlist.id}`}>
          <h4>{playlist.title}</h4>
        </NavLink>
      </div>
      <div>
        <span>Playlist * {playlist.songs?.length} Songs</span>
      </div>
    </div>
  )
}
