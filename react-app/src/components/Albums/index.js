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
                title: {albumsArr[0].title}
                <br></br>
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
