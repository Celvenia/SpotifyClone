import AudioPlayer from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css'; default option
import './Player.css';
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

// from https://www.npmjs.com/package/react-h5-audio-player

const Player = () => (
		<AudioPlayer
			// autoPlay
			// src="https://drive.google.com/uc?export=download&id=1WKH_qL5yB_ggFjGyxIRbKradzaO9xwWT"
			src=''
      onPlay={(e) => console.log('onPlay')}
			className="audio-player"
			// other props here
		/>
);

export default Player;
