import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { deleteAPlaylist, getPlaylist, updateAPlaylist } from "../../store/playlists";
import { getPlaylistSongs } from "../../store/playlistSongs";
import { getUser, getUsers } from "../../store/users";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

import Search from "../Search";
import PlaylistSongs from "../PlaylistSongs";
import "../../index.css"
import "./Playlist.css"

export default function Playlist({ onQueueChange }) {
  const dispatch = useDispatch()
  const history = useHistory();
  const [queue, setQueue] = useState([])
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

  const [title, setTitle] = useState(currentPlaylist?.title);
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    dispatch(getPlaylist(playlistId))
    dispatch(getPlaylistSongs(playlistId))
    dispatch(getUsers())
    if (currentPlaylist) {
      dispatch(getUser(currentPlaylist['user_id']))
    }
  }, [dispatch, playlistId, currentPlaylist])


  const handleDeleteClick = async (e) => {
    e.preventDefault();
    dispatch(deleteAPlaylist(playlistId))
      .then(history.push("/"))
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handlePlayClick = async (e) => {
    e.preventDefault();

    if (queue?.length && queue !== undefined) {
      const combinedQueue = new Set([...queue, ...songsArr])
      setQueue([...combinedQueue])
      onQueueChange([...combinedQueue])
    } else {
      new Set([...songsArr])
      setQueue([...songsArr])
      onQueueChange([...songsArr])
    }
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTitleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAPlaylist(currentPlaylist, { title }))
      .then(() => dispatch(getPlaylist(currentPlaylist.id)))
      .then(() => setIsEditing(false));
  };


  return (
    <div>
      <Search />

      {!currentPlaylist ? "Playlist Not Found" : isEditing ?
        <div>
          <form className="playlist-title-edit-form" onSubmit={handleTitleSubmit}>
            <input className="playlist-edit-title-input" maxLength={20} type="text" onChange={handleTitleChange} />
            <div>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
        </div>
        :
        <>
          <div className="playlist-header">
            <p>Playlist - Made By {user?.public_name}</p>
            <h1>{currentPlaylist?.title} <FontAwesomeIcon size="sm" icon={faPenToSquare} onClick={handleEditClick} /> </h1>
            {currentUserId === userId && (
              <div className="playlist-actions">
                <button className="play-playlist-button" onClick={handlePlayClick}>
                  ADD PLAYLIST TO QUEUE
                </button>
                <button className="delete-playlist-button" onClick={handleDeleteClick}>
                  DELETE PLAYLIST
                </button>
              </div>
            )}
          </div>

          <PlaylistSongs songs={songsArr} />
        </>
      }
    </div >
  )
}
