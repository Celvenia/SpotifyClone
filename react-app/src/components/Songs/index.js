import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSongs } from "../../store/songs"
import { NavLink } from "react-router-dom";



export default function Songs() {
    const dispatch = useDispatch()
    const songsObj = useSelector(state => state.songReducer)
    const songsArr = Object.values(songsObj);



    useEffect(() => {
        dispatch(getSongs())
    }, [dispatch])



    if (!songsArr.length) {
        return <div>Loading...</div>;
      }

    return (
        <>
        <div>Songs</div>
        {songsArr.length &&
          songsArr.map((song) =>
            song.id !== undefined ? (
              <div key={song.id}>
                <NavLink
                  to={`/songs/${song.id}`}
                  className="nav-link"
                  key={song.id}
                >
                  <div>
                    {song.title}
                  </div>
                </NavLink>
              </div>
            ) : (
              ""
            )
          )}
        </>
    )
}
