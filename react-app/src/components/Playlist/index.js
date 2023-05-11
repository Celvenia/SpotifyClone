import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPlaylist } from "../../store/playlists";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../index.css"

export default function Playlist() {
    const dispatch = useDispatch()
    const { playlistId } = useParams();
    const playlistObj = useSelector(state => state.playlistReducer)
    const playlistArr = Object.values(playlistObj);
    const playlist = playlistArr.filter(list => list?.id == playlistId)
    // const playlist = playlistObj?.playlistId
    const songsArr = playlistObj?.playlistId?.songs
    // const sessionUser = useSelector(state => state.session.user);
    // const userId = sessionUser?.id
    // console.log(playlistArr)
    console.log(playlist)
    useEffect(() => {
        dispatch(getPlaylist(playlistId))
    }, [dispatch])



    // if (!playlistsArr.length) {
    //     return <div>Loading...</div>;
    // }

    //   Song(album_id=1, title='Come & Go', duration_ms=229000, url='https://www.youtube.com/watch?v=5ho88VXJTBg', release_date=datetime(2020, 7, 10), genre='Hip Hop'),

    return (

        <div className="main-content">
            <h1>Playlist</h1>
            {playlist.title}
        </div>
    )
}