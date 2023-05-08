import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadSongs } from "../../store/songs";

export default function Songs() {
    const dispatch = useDispatch()
    // const songs = useSelector()

    useEffect(() => {
        dispatch(loadSongs())
    }, [dispatch])

    return (
        <div>Songs</div>
    )
}