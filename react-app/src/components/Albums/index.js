import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAlbums, getLikedAlbums } from "../../store/albums";
import { NavLink } from "react-router-dom";

export default function Albums() {
    const dispatch = useDispatch()
    const albumsObj = useSelector(state => state.albumReducer)
    const albumsArr = Object.values(albumsObj);
    const likedAlbumsObj = useSelector(state => state.albumReducer.liked_albums)
    const likedAlbumsArr = Object.values(likedAlbumsObj)
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser?.id


    useEffect(() => {
        dispatch(getAlbums())
        if (userId) {
            dispatch(getLikedAlbums(userId))
        }
    }, [dispatch, userId])

    useEffect(() => {
        dispatch(getAlbums())
    }, [dispatch])

    if (!albumsArr.length) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div>Albums</div>
            {albumsArr.length &&
                albumsArr.map((album) =>
                    album.id !== undefined ? (
                        <div key={album.id}>
                            <NavLink
                                to={`/albums/${album.id}`}
                                className="album-link"
                                key={album.id}
                            >
                                <div>
                                    {album.title}
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
