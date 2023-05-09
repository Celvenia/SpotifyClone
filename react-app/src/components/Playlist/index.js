import React from 'react';
import { NavLink } from 'react-router-dom';

const Playlist = ({ playlist }) => {
    const sessionUser = useSelector(state => state.session.user);
    
  return (
    <div>
        <p>Playlist</p>
      <h1>{playlist.name}</h1>
      <p>sessionUser.public_name</p>
      <ul>
        {playlist.songs.map(song => (
          <li key={song.id}>
            <NavLink to={`/songs/${song.id}`}>{song.title}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;