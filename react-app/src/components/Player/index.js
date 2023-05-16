import React, { useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Player.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForwardStep, faBackwardStep } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';


const Player = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const sessionUser = useSelector(state => state.session.user)
  // const usersObj = useSelector(state => state.users)

  const handleNextSong = () => {
    if(songs.length !== undefined) {
      const nextSongIndex = (currentSongIndex + 1) % songs.length;
      setCurrentSongIndex(nextSongIndex);
    }
  };

  // [0,1,2,3]
  const handlePrevSong = () => {
    if(songs.length !== undefined) {
      const prevSongIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
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
      <div className="audio-player-current-song">
        {sessionUser ? songs?.[currentSongIndex]?.title : ""}
      </div>
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

    </div>
  );
};

export default Player;