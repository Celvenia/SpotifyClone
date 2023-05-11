import React from 'react'
import { NavLink } from 'react-router-dom'
import './SidebarPlaylist.css'

export default function SidebarPlaylist({ playlist }) {
  console.log(playlist)
  return (
    <div className='sidebar-block'>
      <div>
        <NavLink exact to={`/playlists/${playlist.id}`}>
          <h4>{playlist.title}</h4>
        </NavLink>
      </div>
      <div>
        <span>Playlist * {playlist.songs.length} Songs</span>
      </div>
    </div>
  )
}
