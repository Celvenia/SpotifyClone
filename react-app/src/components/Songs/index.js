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

    let songsValues;

	if (songsArr[0]) {
		songsValues = (

            <>
                id: {songsArr[0].id}
                <br></br>
                title: {songsArr[0].title}
                <br></br>
                duration_ms: {songsArr[0].duration_ms}
                <br></br>
                url: {songsArr[0].url}
                <br></br>
                release_date: {songsArr[0].release_date}
                <br></br>
                genre: {songsArr[0].genre}
                <br></br>
                user_id: {songsArr[0].user_id}
                <br></br>
                created_at: {songsArr[0].created_at}
                <br></br>
                updated_at: {songsArr[0].updated_at}
            </>
		);
	} else {
		songsValues = (
            <>
                No values
            </>
		);
	}

    return (
        <>
            <div>Songs</div>
            {songsValues}
        </>
    )
}
