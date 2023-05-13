import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSongs } from "../../store/songs"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { NavLink } from "react-router-dom";
import './Search.css'
import { updatePlaylistWithSong } from "../../store/playlistSongs";
import { useParams } from "react-router-dom";


export default function Search() {
  const currentUrl = window.location.href;
  const isSearchPage = currentUrl.includes('/search');
  const isPlaylistPage = currentUrl.includes('/playlists')

  const dispatch = useDispatch()
  const { playlistId } = useParams()
  const [searchInput, setSearchInput] = useState("");
  const [errors, setErrors] = useState([]);
  const [state, setstate] = useState({
    query: '',
    list: []
  })

  const songsObj = useSelector(state => state.songReducer)
  const songsArr = Object.values(songsObj);
  const userObj = useSelector(state => state.userReducer)


  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    const results = songsArr.filter(song => {
      if (e.target.value === "") return song
      return song.title.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setstate({
      query: e.target.value,
      list: results
    })
  }

  const handleAddClick = async (e) => {
    e.preventDefault();
    const data = await dispatch(updatePlaylistWithSong(playlistId, e.target.value));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <>
      <div className="search-container">
        <div className="search-icon">
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <input
          type="text"
          placeholder="What songs do you want to listen to"
          className="search-input"
          value={searchInput}
          onChange={handleChange}

        />
      </div>

      <ul>
        {(state.query === '' ? "" : state.list.map(song => (
          isSearchPage ?
            <div className="search-song-container">
              <NavLink to={`/songs/${song.id}`} className="search-song-link">{song.title}</NavLink>
            </div>
            : (
              <li key={song.title}>
                <button className="search-add-button" value={song.id} onClick={handleAddClick}>
                  Add Song
                </button>

                {song.title} By {userObj[song.user_id].public_name}

              </li>
            )
        )))}
      </ul>
      <div class="search-card">
        <h3>Recent Searches</h3>
        <ul>
          <li><a href="#">Song 1</a></li>
          <li><a href="#">Song 2</a></li>
          <li><a href="#">Song 3</a></li>
          <li><a href="#">Song 4</a></li>
          <li><a href="#">Song 5</a></li>
        </ul>
      </div>
      <div class="browse-card">
        <img src="https://picsum.photos/300/200" alt="Card Image" />
        <div class="card-body">
          <h3 class="card-title">PodCasts</h3>
        </div>
      </div>



    </>
  )
}
