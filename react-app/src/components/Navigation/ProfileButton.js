import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { resetPlaylists } from "../../store/playlists";
import {  useHistory } from "react-router-dom";
import "./Navigation.css"
import SongCreate from "../SongCreate";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
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

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout())
      .then(dispatch(resetPlaylists()))
      .then(history.push('/'))
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button className="invisible-button" onClick={openMenu}>
        {user ? <img alt="profile" className="small-profile-pic" src={user.profile_picture} />
          :
          <i className="fas fa-user-circle" />}

      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.email}</li>
            {user.is_artist ? <OpenModalButton
              buttonText="Create Song"
              onItemClick={closeMenu}
              modalComponent={<SongCreate />}
            /> : ""}
            <li>
              <button style={{
                height: "30px",
                backgroundColor: "#212121",
                margin: "3px 3px 3px",
                color: "white",
                borderRadius: "20px",
                boxShadow: "2px 2px 2px 1px #1db954"
              }} onClick={handleLogout}>Log Out</button>
            </li>
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
      </ul>
    </>
  );
}

export default ProfileButton;
