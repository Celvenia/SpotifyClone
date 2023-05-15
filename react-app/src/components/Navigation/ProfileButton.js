import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { getPlaylists } from '../../store/playlists';
import { resetPlaylists } from '../../store/playlists';
import './Navigation.css';

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener('click', closeMenu);

		return () => document.removeEventListener('click', closeMenu);
	}, [showMenu]);

	const handleLogout = async (e) => {
		e.preventDefault();
		await dispatch(logout());
		dispatch(resetPlaylists());
	};

	const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');
	const closeMenu = () => setShowMenu(false);

	return (
		<>
			{/* <button className="invisible-button profile-picture-div" onClick={openMenu}> */}
			{/* <i className="fas fa-user-circle" /> */}
			<div className="profile-picture-div" onClick={openMenu}>
				<img src={user ? user.profile_picture:""} className="profile-picture" alt={user ? user.username:""} />
			</div>
			{/* </button> */}
			<div className={ulClassName} ref={ulRef}>
				{user ? (
					<>
						<div>{user.username}</div>
						<div>{user.is_artist ? 'Upload Songs' : ''}</div>
						<hr className="profile-hr" />
						<div>
							<button onClick={handleLogout}>Log Out</button>
						</div>
					</>
				) : (
					<>
						<OpenModalButton
							buttonText="Log In"
							onItemClick={closeMenu}
							modalComponent={<LoginFormModal />}
						/>

						<OpenModalButton
							buttonText="Sign Up"
							onItemClick={closeMenu}
							modalComponent={<SignupFormModal />}
						/>
					</>
				)}
			</div>
		</>
	);
}

export default ProfileButton;
