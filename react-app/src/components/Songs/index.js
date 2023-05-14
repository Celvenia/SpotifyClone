import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../../store/songs";
import "./Songs.css";
import Song from "../Song";

export default function Songs(props) {
  const dispatch = useDispatch();
  const songsObj = useSelector((state) => state.songReducer);
  const songsArr = Object.values(songsObj);


  useEffect(() => {
    dispatch(getSongs());
  }, [dispatch]);

  if (!songsArr.length) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Songs</div>
      {songsArr.length &&
        songsArr.map((song) =>
          song.id !== undefined ? (
            <div key={song.id} >
              <Song song={song} />
            </div>
          ) : (
            "No songs"
          )
        )}
    </>
  );
}
