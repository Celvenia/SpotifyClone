import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadAlbums } from "../../store/albums";

export default function Songs() {
    const dispatch = useDispatch()
    const albumsObj = useSelector(state => state.albums)
    const albumsArr = Object.values(albumsObj);
    const album = albumsArr[0]
    console.log({...albumsArr})
    console.log({...album})

    useEffect(() => {
        dispatch(loadAlbums())
    }, [dispatch])

    let albumsValues;

	if (albumsArr[0]) {
		albumsValues = (

            <>
                id: {albumsArr[0].id}
                <br></br>
                title: {albumsArr[0].title}
                <br></br>
                cover_art: {albumsArr[0].cover_art}
                <br></br>
                record_label: {albumsArr[0].record_label}
                <br></br>
                release_date: {albumsArr[0].release_date}
                <br></br>
                genre: {albumsArr[0].genre}
                <br></br>
                user_id: {albumsArr[0].user_id}
                <br></br>
                created_at: {albumsArr[0].created_at}
                <br></br>
                updated_at: {albumsArr[0].updated_at}
            </>
		);
	} else {
		albumsValues = (
            <>
                No values
            </>
		);
	}

    return (
        <>
            <div>Albums</div>
            {albumsValues}
        </>
    )
}

  return (
    <div></div>
  )
}