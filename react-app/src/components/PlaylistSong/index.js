import React from 'react';

export default function PlaylistSong({song}) {

    function convertDuration(duration_ms) {
        const minutes = Math.floor(duration_ms / 60000);
        const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }

    function convertDate(date) {
        return date.slice(0, 11);
    }

    // const handleSongClick = async (song) => {
    //     localStorage.setItem('currentUrl', song.url);
    //   };

    return (
        // <div onClick={()=> handleSongClick(song)} className="song-link">
        <div className="song-link">
            <span>Name: {song.title}</span>
            <span>Date released: {convertDate(song.release_date)}</span>
            <span>Duration: {convertDuration(song.duration_ms)}</span>
        </div>
    );
}
