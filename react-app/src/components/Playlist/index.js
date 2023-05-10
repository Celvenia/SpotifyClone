import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Playlist = ({ playlist }) => {
    const sessionUser = useSelector(state => state.session.user);


    // const handleDeletePlaylistClick = async (e) => {
    //   e.preventDefault();
    //   dispatch(deleteAPlaylist(playlist.id)).then(closeModal);
    // };
    
  // return (
  //   <div>
  //       <p>Playlist</p>
  //     <h1>{playlist.name}</h1>
  //     {/* <p>sessionUser.public_name</p> */}
  //     <ul>
  //       {playlist.songs.map(song => (
  //         <li key={song.id}>
  //           <NavLink to={`/songs/${song.id}`}>{song.title}</NavLink>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
    return (
    <div className='playlist'>
      <h3 className='playlist_title'>Playlist</h3>
      <ul className='playlist_songs'>
        {playlist.songs.map((song, idx) => (
          <li key={idx} className='playlist_song'>
            <NavLink to={`/songs/${song.id}`}>{song.title}</NavLink>
          </li>
        ))}
      </ul>

      
    </div>
  );
};

export default Playlist;