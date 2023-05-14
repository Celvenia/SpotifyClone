import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";

import { deleteAPlaylist, getPlaylist, updateAPlaylist } from "../../store/playlists";
import { getPlaylistSongs } from "../../store/playlistSongs";
import { getUser, getUsers } from "../../store/users";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

import Search from "../Search";
import PlaylistSongs from "../PlaylistSongs";
import Player from "../Player";
import "../../index.css"
import "./Playlist.css"

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

  const [title, setTitle] = useState(currentPlaylist?.title);
  const [isEditing, setIsEditing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSongUrl, setCurrentSongUrl] = useState(null);


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

  const handleEditClick = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handlePlayClick = async (e) => {
    e.preventDefault();
    setIsPlaying(!isPlaying)
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTitleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAPlaylist(currentPlaylist, { title }))
      .then(() => dispatch(getPlaylist(playlistId)))
      .then(() => setIsEditing(false));
  };

  return (
    <div>
      <Search />
      <p>Playlist - Made By {user?.public_name}</p>
      {isEditing ?
        <form className="playlist-title-edit-form" onSubmit={handleTitleSubmit}>
          <input className="playlist-edit-title-input" type="text" value={title} onChange={handleTitleChange} />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form> :
        <>
          <div className="playlist-header">
            <h1>{currentPlaylist?.title} <FontAwesomeIcon size="sm" icon={faPenToSquare} onClick={handleEditClick} /> </h1>
            {currentUserId == userId && (
              <div className="playlist-actions">
                <button className="play-playlist-button" onClick={handlePlayClick}>
                  PLAY PLAYLIST
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

      <Player songs={songsArr} />
    </div>
  )
}
