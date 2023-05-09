// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { getSong } from "../../store/songs"
// import { NavLink } from "react-router-dom";

// export default function Song({{song}}) {
//     const dispatch = useDispatch()
//     const songsObj = useSelector(state => state.songReducer)
//     const songsArr = Object.values(songsObj);

//     console.log(songsArr)

//     useEffect(() => {
//         dispatch(getSong(song.id))
//     }, [dispatch])

//     if (!songsArr.length) {
//         return <div>Loading...</div>;
//       }

//     return (
//         <>
//         <div>Songs</div>
//         </>
//     )
// }
