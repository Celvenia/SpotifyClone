import React, { useState, useEffect, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { useDispatch, useSelector } from "react-redux";
import 'react-h5-audio-player/lib/styles.css';
import './Player.css';

const Player = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const userObj = useSelector(state => state.userReducer)
  const [songName,setSongName] = useState('');
  const [songArtist,setSongArtist] = useState('');
  const player = useRef();

  useEffect(()=>{
if (songs!= null) {
  setSongName(songs[currentSongIndex]?.title);
  setSongArtist(userObj[songs[currentSongIndex]?.user_id]?.public_name);
}

  },[]);

  async function PlayCurrentSong(song)  {
    console("test this function")
    // setSongName(song.title);
    // setSongArtist(userObj[song.user_id]?.public_name);
    // setCurrentSongIndex(song.url);
    // player.current.audio.current.play();
  };

  const handleNextSong = () => {
    if (songs != null) {
    const nextSongIndex = (currentSongIndex + 1) % songs.length;
    setSongName(songs[currentSongIndex + 1]?.title);
    setSongArtist(userObj[songs[currentSongIndex + 1]?.user_id]?.public_name);
    setCurrentSongIndex(nextSongIndex);
    }
  };

  const handlePrevSong = () => {
    if (songs!= null) {
    const prevSongIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(prevSongIndex);
    }
  };

  return (
    
    <div className="audio-player-container">
      <div className="audio-player-buttons">
        <button onClick={handlePrevSong}>Prev</button>
        <button onClick={handleNextSong}>Next</button>
      </div>
     <AudioPlayer
        autoPlay
        src={songs ? songs[currentSongIndex]?.url:currentSongIndex}
        className="audio-player"
        onEnded={handleNextSong}
      />
     
    <div className="songName">
     {songName} - {songArtist} 
    </div>
    </div>
    
  );
};

export default Player;
