import React, { useState, useEffect, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { useDispatch, useSelector } from "react-redux";
import 'react-h5-audio-player/lib/styles.css';
import './Player.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForwardStep, faBackwardStep } from '@fortawesome/free-solid-svg-icons'



const Player = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const sessionUser = useSelector(state => state.session.user)
  const [songName,setSongName] = useState('');
  const [songArtist,setSongArtist] = useState('');
  const userObj = useSelector(state => state.userReducer)

  useEffect(()=>{
    if(songs.length != undefined) {
      setSongName(songs[currentSongIndex]?.title);
      setSongArtist(userObj[songs[currentSongIndex]?.user_id]?.public_name);
    }
    else {
      setSongName('');
      setSongArtist('');
    }
  },[]);
  const handleNextSong = () => {
    if(songs.length !== undefined) {
      const nextSongIndex = (currentSongIndex + 1) % songs.length;
      setSongName(songs[nextSongIndex]?.title);
      setSongArtist(userObj[songs[nextSongIndex]?.user_id]?.public_name);
      setCurrentSongIndex(nextSongIndex);
    }
  };

  // [0,1,2,3]
  const handlePrevSong = () => {
    if(songs.length !== undefined) {
      const prevSongIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
      setSongName(songs[prevSongIndex]?.title);
      setSongArtist(userObj[songs[prevSongIndex]?.user_id]?.public_name);
      setCurrentSongIndex(prevSongIndex);
    }
  };

  return (
    
    <div className="audio-player-container">
      <div className="audio-player-buttons">

        <FontAwesomeIcon title="Previous Song" onClick={handlePrevSong} icon={faBackwardStep} />
        <FontAwesomeIcon title="Next Song" onClick={handleNextSong} icon={faForwardStep} />

      </div>
      { songs != null ?
      <>
        <AudioPlayer
        // autoPlay
        src={songs[currentSongIndex]?.url}
        className="audio-player"
        /> 
        </>
        :
        <AudioPlayer
        // autoPlay
        src={null}
        className="audio-player"
        />
      }
    <div className="audio-player-current-song">
     {songName} ~~ {songArtist} 
    </div>
    </div>
    
  );
};

export default Player;