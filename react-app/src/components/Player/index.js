import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

const Player = () => (
  <AudioPlayer
    autoPlay
    src="https://drive.google.com/uc?export=download&id=1WKH_qL5yB_ggFjGyxIRbKradzaO9xwWT
    "
    onPlay={e => console.log("onPlay")}
    className="audio-player"
    // other props here
  />
);

export default Player;
