import React from 'react';
import "./PlaylistSong.css"

export default function PlaylistSong({ song }) {

    function convertDuration(duration_ms) {
        const minutes = Math.floor(duration_ms / 60000);
        const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }

    function convertDate(date) {
        return date.slice(0, 11);
    }

    return (
        <div className="song-link">
            <div><span className="song-label">Name:</span> {song.title}</div>
            <div><span className="song-label">Date released:</span> {convertDate(song.release_date)}</div>
            <div><span className="song-label">Duration:</span> {convertDuration(song.duration_ms)}</div>
        </div>
    );
}
