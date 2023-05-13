import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

const Player = () => (
  <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}>
  <AudioPlayer
    autoPlay
    src=" "
    onPlay={e => console.log("onPlay")}
    className="audio-player"
    // other props here
  />
  </div>

);

export default Player;
