import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistSongs } from "../../store/playlistSongs";
import { NavLink, useParams } from "react-router-dom";
import {PlayCurrentSong} from "../Player";

export default function PlaylistSongs({songs}) {

  if (!songs || !songs.length) {
    return <div style={{color: "#1db954"}}>Use Search to add some songs to your playlist!</div>;
  }

  function convertDuration(duration_ms) {
    const minutes = Math.floor(duration_ms / 60000);
    const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  function convertDate(date) {
    return date.slice(0, 11)
  }

  return (
    <>
      <div>Songs</div>
      {songs.map((song) => (
        <div key={song.id}>
          <a onClick={()=> PlayCurrentSong(song)} className="song-link">
            <span>Name: {song.title}</span>
            <span>Date released: {convertDate(song.release_date)}</span>
            <span>Duration: {convertDuration(song.duration_ms)}</span>
          </a>
        </div>
      ))}
    </>
  );
}
