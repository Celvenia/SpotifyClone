import React, { useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Player.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForwardStep, faBackwardStep } from '@fortawesome/free-solid-svg-icons'


const Player = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const handleNextSong = () => {
    if(songs.length !== undefined) {
      const nextSongIndex = (currentSongIndex + 1) % songs.length;
      setCurrentSongIndex(nextSongIndex);
    }
  };

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
        <AudioPlayer
        // autoPlay
        src={songs[currentSongIndex]?.url}
        className="audio-player"
        /> :
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

// import React, { useState, useEffect, useRef } from 'react';
// import AudioPlayer from 'react-h5-audio-player';
// import { useDispatch, useSelector } from "react-redux";
// import 'react-h5-audio-player/lib/styles.css';
// import './Player.css';


// const Player = ({ songs }) => {
//   const [currentSongIndex, setCurrentSongIndex] = useState(0);
//   const userObj = useSelector(state => state.userReducer)
//   const [songName,setSongName] = useState('');
//   const [songArtist,setSongArtist] = useState('');
//   const [currentUrl, setCurrentUrl] = useState('')
//   const player = useRef();

//   useEffect(()=>{
// if (songs!= null) {
//   setSongName(songs[currentSongIndex]?.title);
//   setSongArtist(userObj[songs[currentSongIndex]?.user_id]?.public_name);
// }
//   },[]);

//   useEffect(() => {
//     const currentUrl = localStorage.getItem('currentUrl');
//     if (currentUrl) {
//       setCurrentUrl(currentUrl);
//     }
//   }, []);

// function PlayCurrentSong (song, setSongName, setSongArtist, setCurrentSongIndex, player) {
//     setSongName(song.title);
//     setSongArtist(userObj[song.user_id]?.public_name);
//     setCurrentSongIndex(song.url);
//     player.current.audio.current.play();
//   };

//   const handleNextSong = () => {
//     if (songs != null) {
//     const nextSongIndex = (currentSongIndex + 1) % songs.length;
//     setSongName(songs[currentSongIndex + 1]?.title);
//     setSongArtist(userObj[songs[currentSongIndex + 1]?.user_id]?.public_name);
//     setCurrentSongIndex(nextSongIndex);
//     }
//   };

//   const handlePrevSong = () => {
//     if (songs!= null) {
//     const prevSongIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
//     setCurrentSongIndex(prevSongIndex);
//     }
//   };

//   return (
    
//     <div className="audio-player-container">
//       <div className="audio-player-buttons">
//         <button onClick={handlePrevSong}>Prev</button>
//         <button onClick={handleNextSong}>Next</button>
//       </div>
//      <AudioPlayer
//         autoPlay
//         src={songs ? songs[currentSongIndex]?.url:currentSongIndex}
//         // src={currentUrl}
//         className="audio-player"
//         onEnded={handleNextSong}
//       />
     
//     <div className="songName">
//      {songName} - {songArtist} 
     
//     </div>
//     </div>
    
//   );
// };

// export default Player;
