import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";

import { deleteAPlaylist, getPlaylist } from "../../store/playlists";
import { getPlaylistSongs } from "../../store/playlistSongs";
import { getUser, getUsers } from "../../store/users";

import Search from "../Search";
import "../../index.css"

export default function Playlist() {
  const dispatch = useDispatch()
  const history = useHistory();
  const { playlistId } = useParams();

  const sessionUser = useSelector(state => state.session.user);
  const currentUserId = sessionUser?.id

  const playlistsObj = useSelector(state => state.playlistReducer)
  const currentPlaylist = playlistsObj[playlistId]

  const songsObj = useSelector(state => state.playlistSongsReducer)
  const songsArr = Object.values(songsObj);

  // this is playlist's user
  const users = useSelector(state => state.userReducer)
  const userId = currentPlaylist?.['user_id']
  const user = users?.[userId]


  useEffect(() => {
    dispatch(getPlaylist(playlistId))
    dispatch(getPlaylistSongs(playlistId))
    dispatch(getUsers())
    if (currentPlaylist) {
      dispatch(getUser(currentPlaylist['user_id']))
    }
  }, [dispatch, playlistId])



  const handleDeleteClick = async (e) => {
    e.preventDefault();
    dispatch(deleteAPlaylist(playlistId))
    .then(history.push("/"))
  };

  return (

    <div>
      <Search />
      <p>Playlist</p>
      <h1>{currentPlaylist?.title}</h1>
      <p>{user?.public_name}</p>

      {currentUserId == userId ?
      <button onClick={handleDeleteClick}>
                  DELETE PLAYLIST
                </button> :
                ""
      }

      {songsArr.length &&
        songsArr.map((song) =>
          song.id !== undefined ? (
            <div key={song.id}>
              <NavLink
                to={`/songs/${song.id}`}
                className="nav-link"
                key={song.id}
              >
                {/* this still needs to be the song creator's user */}
                <span>
                  <div>
                    <img src={user?.profile_picture} className='small-pic'></img>
                    <div>
                      {song.title}
                    </div>
                    <div>
                       {user?.public_name}
                    </div>
                  </div>
                </span>

              </NavLink>
            </div>
          ) : (
            ""
          )
        )}
    </div>
  )
}