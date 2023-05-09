import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadSongs } from "../../store/songs";

export default function Songs() {
    const dispatch = useDispatch()
    const songsObj = useSelector(state => state.songs)
    const songsArr = Object.values(songsObj);
    const song = songsArr[0]
    console.log({...songsArr})
    console.log({...song})

    useEffect(() => {
        dispatch(loadSongs())
    }, [dispatch])

    return (
        <>
            <div>Songs</div>
            <div>{songsArr[0].title}</div>
            <div>{song.title}</div>
        </>
    )
}
