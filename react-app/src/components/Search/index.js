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
import SearchPage from "../SearchPage";
import { getPlaylists } from "../../store/playlists";


export default function Search() {
  const currentUrl = window.location.href;
  const isSearchPage = currentUrl.includes('/search');
  const isPlaylistPage = currentUrl.includes('/playlists')
  
  const dispatch = useDispatch()
  const { playlistId } = useParams()
  const [searchInput, setSearchInput] = useState("");
  const [recentSearch, setRecentSearch] = useState("")
  const [errors, setErrors] = useState([]);
  const [state, setState] = useState({
    query: '',
    list: []
  })

  const songsObj = useSelector(state => state.songReducer)
  const songsArr = Object.values(songsObj);
  const usersObj = useSelector(state => state.userReducer)
  const usersArr = Object.values(usersObj)
  const artists = usersArr.filter(obj => obj.is_artist === true)

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    const results = songsArr.filter(song => {
      if (e.target.value === "") return song
      return song.title.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setState({
      query: e.target.value,
      list: results
    })
  }

  const handleAddClick = async (song) => {
    const data = await dispatch(updatePlaylistWithSong(playlistId, song.id));
    await dispatch(getPlaylists())
    if (data) {
      setErrors(data);
    }
    localStorage.setItem('recentSearch', song.title);

    setState({
      query: "",
      list: []
    })
    setSearchInput("")
  };

  const handleSearchClick = async (song) => {
    localStorage.setItem('recentSearch', song.title);
  };

  useEffect(() => {
    const storedRecentSearch = localStorage.getItem('recentSearch');
    if (storedRecentSearch) {
      setRecentSearch(storedRecentSearch);
    }
  }, []);

  return (
    <>
      <div className="search-container">
        <div className="search-icon">
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <input
          type="text"
          placeholder={window.location.href.includes('/search') ? "Navigate To Song Page" : "What songs do you want to listen to"}
          className="search-input"
          value={searchInput}
          onChange={handleChange}

        />
      </div>

      <ul>
        {(state.query === '' ? "" : state.list.map(song => (
          isSearchPage ?
            <div className="search-song-container">
              <NavLink to={`/songs/${song.id}`} onClick={() => handleSearchClick(song)} className="search-song-link">{song.title}</NavLink>
            </div>
            : (
              <li key={song.title}>
                <button className="search-add-button" onClick={() => handleAddClick(song)}>
                  Add Song
                </button>

                {song.title} By {usersObj[song.user_id].public_name}

              </li>
            )
        )))}
      </ul>

      {isSearchPage ? (
        <SearchPage artists={artists} recentSearch={recentSearch} />
      ) : ""}
    </>
  )
}
