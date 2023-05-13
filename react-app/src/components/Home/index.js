import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from '../Navigation/ProfileButton';
import './Home.css';


const Home = ({ isLoaded }) => {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<div className="header">
			<div></div>
			<div className="top-bar">
				<div className="top-bar-left">
					<button className="top-bar-back-button">
						<svg height="16" width="16">
							<path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z" />
						</svg>
					</button>
					<button className="top-bar-forward-button">
						<svg height="16" width="16">
							<path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z" />
						</svg>
					</button>
					{/* <div className="top-bar-content-wrapper"></div> */}
				</div>
				{/* <div className="top-bar-right">
					<div className="profile-button">
						{isLoaded && <ProfileButton user={sessionUser} />}
					</div>
				</div> */}
			</div>


			<div className="content-spacing">
				<section>Good Morning</section>
			</div>
			<div className="home-tile-container">
				{/* spacer */}
				<div className="home-tile">
					<div className='home-tile-image'>
						<img
							src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png" className='home-tile-image'
							width="80"
						></img>
					</div>
					<div>Discover Weekly</div>
					<div className='play-button-container'>
						{' '}
						<svg
							height="24"
							width="24"
							// viewBox="0 0 24 24"
							className="play-button"
						>
							<path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
						</svg>
					</div>
				</div>
				        {/* spacer */}
                <div className="home-tile">
					<div>
						<img
							src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png" className='home-tile-image'
							width="80"
						></img>
					</div>
					<div>Liked Songs</div>
					<div>
						{' '}
						<svg
							height="24"
							width="24"
							// viewBox="0 0 24 24"
							className="play-button"
						>
							<path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
						</svg>
					</div>
				</div>        {/* spacer */}
				<div className="home-tile">
					<div>
						<img
							src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png" className='home-tile-image'
							width="80"
						></img>
					</div>
					<div>Liked Songs</div>
					<div>
						{' '}
						<svg
							height="24"
							width="24"
							// viewBox="0 0 24 24"
							className="play-button"
						>
							<path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
						</svg>
					</div>
				</div>        {/* spacer */}
				<div className="home-tile">
					<div>
						<img
							src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png" className='home-tile-image'
							width="80"
						></img>
					</div>
					<div>Liked Songs</div>
					<div>
						{' '}
						<svg
							height="24"
							width="24"
							// viewBox="0 0 24 24"
							className="play-button"
						>
							<path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
						</svg>
					</div>
				</div>        {/* spacer */}
				<div className="home-tile">
					<div>
						<img
							src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png" className='home-tile-image'
							width="80"
						></img>
					</div>
					<div>Liked Songs</div>
					<div>
						{' '}
						<svg
							height="24"
							width="24"
							// viewBox="0 0 24 24"
							className="play-button"
						>
							<path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
						</svg>
					</div>
				</div>        {/* spacer */}
				<div className="home-tile">
					<div>
						<img
							src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png" className='home-tile-image'
							width="80"
						></img>
					</div>
					<div>Liked Songs</div>
					<div>
						{' '}
						<svg
							height="24"
							width="24"
							// viewBox="0 0 24 24"
							className="play-button"
						>
							<path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
