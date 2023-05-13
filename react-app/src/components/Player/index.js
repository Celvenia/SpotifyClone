import React, { useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Player.css';

const Player = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const handleNextSong = () => {
    const nextSongIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextSongIndex);
  };

  const handlePrevSong = () => {
    const prevSongIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(prevSongIndex);
  };

  return (
    <div className="audio-player-container">
      <div className="audio-player-buttons">
        <button onClick={handlePrevSong}>Prev</button>
        <button onClick={handleNextSong}>Next</button>
      </div>
      <AudioPlayer
        autoPlay
        src={songs[currentSongIndex]?.url}
        className="audio-player"
      />
    </div>
  );
};

export default Player;
