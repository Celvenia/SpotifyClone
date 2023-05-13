import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPlaylistSongs } from "../../store/playlistSongs";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";



export default function PlaylistSongs() {
  const dispatch = useDispatch()
  const {playlistId} = useParams()
  const songsObj = useSelector(state => state.playlistSongsReducer)
  const songsArr = Object.values(songsObj);


  useEffect(() => {
    dispatch(getPlaylistSongs(playlistId))
  }, [dispatch])



  if (!songsArr.length) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Songs</div>
      {songsArr.length &&
        songsArr.map((song) =>
          song.id !== undefined ? (
            <div key={song.id}>
              <NavLink
                to={`/songs/${song.id}`}
                className="song-link"
                key={song.id}
              >

                <span>
                  {song.title}
                </span>
                <span>
                  {song.release_date}
                </span>
                <span>
                  {song.duration_ms}
                </span>

              </NavLink>
            </div>
          ) : (
            "use search to add songs to your playlist"
          )
        )}
    </>
  )
}
