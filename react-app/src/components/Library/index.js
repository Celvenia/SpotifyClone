import React, { useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
import Playlist from '../Playlist';
import LibraryNav from '../LibraryNav';
import { getPlaylists } from '../../store/playlists';
import { getSongs } from '../../store/songs';
import { getAlbums, getLikedAlbums } from '../../store/albums';
import { useDispatch, useSelector } from 'react-redux';
import './Library.css'

const Library = ({ isLoaded }) => {
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

    const playlist = {
        name: 'My Playlist',
        songs: [
          { name: 'Song 1' },
          { name: 'Song 2' },
          { name: 'Song 3' },
          { name: 'Song 4' },
          { name: 'Song 5' },
          { name: 'Song 6' },
          { name: 'Song 7' },
          { name: 'Song 8' },
          { name: 'Song 9' },
          { name: 'Song 10' },
        ],
      };

    // return (
    //     <div className='library_wrapper'>
    //         <div className="library"> 

    //         <span>
    //             Icon(clicking will enlarge and show library)
    //             Plus Sign(creates playlist)
    //             Right Arrow(enlarges library)
    //         </span>

    //         </div>
  
    //         <div className="library_link">Library Link</div>
    //         <div className="library_link">Library Link</div>
    //         <div className="library_link">Library Link</div>
    //         <div className="library_link">Library Link</div>
            
    //     </div>
    // );
    return (

        <div className='library_wrapper'>
            <h3 style={{ color: 'grey' }}>Your Library</h3>
          <LibraryNav />
        </div>

      );
};

export default Library;