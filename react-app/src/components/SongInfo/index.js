import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSong } from "../../store/songs"
import { NavLink, useParams } from "react-router-dom";


export default function SongInfo() {
    const dispatch = useDispatch()
    const { songId } = useParams();
    const songsObj = useSelector(state => state.songReducer)
    const songsArr = Object.values(songsObj);
    // const song = songsArr.filter(songId == id)
    const song = songsObj[songId]

        useEffect(() => {
            dispatch(getSong(songId))
        }, [dispatch])

    //     if (!songsArr.length) {
    //         return <div>Loading...</div>;
    //       }

    return (
<div>
    <div>{song.title}</div>
    <div> This is where something like lyrics would go</div>

    <NavLink to={`/songs/${song.id}`}>
        <button type="submit">{song.url}</button>
    </NavLink>
</div>

    )
}
