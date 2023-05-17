import React, { useEffect } from 'react';
import "./PlaylistSong.css"
import { useDispatch } from 'react-redux';
import { deleteAPlaylistSong, getPlaylistSongs } from '../../store/playlistSongs';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

export default function PlaylistSong({ song }) {
    const dispatch = useDispatch()
    const { playlistId } = useParams()


    function convertDuration(duration_ms) {
        const minutes = Math.floor(duration_ms / 60000);
        const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }

    function convertDate(date) {
        return date.slice(0, 11);
    }

    const handleRemoveSongClick = async (e) => {
        e.preventDefault()

        dispatch(deleteAPlaylistSong(playlistId, song.id))
    }

    useEffect(() => {
        dispatch(getPlaylistSongs(playlistId))
    },[dispatch])

    return (
        <div className="song-link">
            <div><span className="song-label">Name:</span> {song.title}</div>
            <div><span className="song-label">Date released:</span> {convertDate(song.release_date)}</div>
            <div><span className="song-label">Duration:</span> {convertDuration(song.duration_ms)}</div>
            <button className="remove-playlist-song-button" onClick={handleRemoveSongClick}>Remove From Playlist</button>
        </div>
    );
}
