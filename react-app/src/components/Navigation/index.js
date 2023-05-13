import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<>
			{/* <li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			<li>
				<NavLink exact to="/search">Search</NavLink>
			</li> */}
			{isLoaded && (
				<div className='profile-button'>
					<ProfileButton user={sessionUser} className='profile-button'/>
				</div>
			)}
		</>
	);
}

export default Navigation;
