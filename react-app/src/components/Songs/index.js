import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadSongs } from "../../store/songs";

export default function Songs() {
    const dispatch = useDispatch()
    const songsObj = useSelector(state => state.songs)
    const songsArr = Object.values(songsObj);
    console.log(songsArr)

    useEffect(() => {
        dispatch(loadSongs())
    }, [dispatch])

    return (
        <>
        <div>Songs</div>
        </>
    )
}
