import React from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className="gap">
			{isLoaded && (
				<li className='profile-button'>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</div>
	);
}

export default Navigation;