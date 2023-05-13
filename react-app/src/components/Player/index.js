import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import "./Player.css"
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

const Player = ({songs}) => (
  <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}>

  <AudioPlayer
    // autoPlay
    // src={songs[2].url}
    // onPlay={e => ()}
    className="audio-player"
    // other props here
  />
  </div>

);



export default Player;
