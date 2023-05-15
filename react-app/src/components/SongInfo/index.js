import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteASong, getSong } from "../../store/songs"
import { useParams, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import SongUpdateModal from "../SongUpdateModal";
import "./SongInfo.css"

export default function SongInfo() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { songId } = useParams();
    const songsObj = useSelector(state => state.songReducer)
    const sessionUser = useSelector(state => state.session)
    const song = songsObj[songId]

    useEffect(() => {
        dispatch(getSong(songId))
    }, [dispatch, songId])


    const handleDeleteClick = async (e) => {
        e.preventDefault()
        dispatch(deleteASong(songId))
        history.push('/')
    }


    return (!song ? <div>Sorry Song with Id #{songId} Not Found </div> :
        <div>
            <div>{song.title}</div> {sessionUser.user.id === song.user_id ? <button className="delete-song-button" onClick={handleDeleteClick}>Delete</button> : ""}
            {sessionUser.user.id === song.user_id ?
                <OpenModalButton
                    buttonText="Update"
                    className="update-song-button"
                    modalComponent={<SongUpdateModal song={song}/>}
                /> : ""}
            <div> This is where something like lyrics would go</div>

        </div>

    )
}
