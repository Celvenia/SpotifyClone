// constant variables for action creator
const LOAD_ALBUM = "/albums/LOAD_ALBUM";
const LOAD_ALBUMS = "/albums/LOAD_ALBUMS";
const ADD_LIKED_ALBUM = "/users/ADD_LIKED_ALBUM";
const REMOVE_LIKED_ALBUM = "/users/REMOVE_LIKED_ALBUM";
const LOAD_LIKED_ALBUMS = "/albums/LOAD_LIKED_ALBUMS";

// action creators - define actions( objects with type/data )
// after running fetch with action creator, parameter is response, type is action for creator to run
const loadAlbum = (album) => ({
    type: LOAD_ALBUM,
    album,
});

const loadAlbums = (albums) => ({
    type: LOAD_ALBUMS,
    albums,
});

const loadLikedAlbums = (likedAlbums) => ({
    type: LOAD_LIKED_ALBUMS,
    likedAlbums,
});

const addLikedAlbum = (userId, albumId) => ({
    type: ADD_LIKED_ALBUM,
    userId,
    albumId,
});

const removeLikedAlbum = (userId, albumId) => ({
    type: REMOVE_LIKED_ALBUM,
    userId,
    albumId,
});

// thunk action creators - for asynchronous code, i.e fetch calls prior to dispatching action creators
export const getAlbum = (albumId) => async (dispatch) => {
    const res = await fetch(`/api/albums/${albumId}`);

    if (res.ok) {
        const album = await res.json();
        dispatch(loadAlbum(album));
        return album;
    } else return res.json();
};

export const getAlbums = () => async (dispatch) => {
    try {
        const res = await fetch("/api/albums");
        if (res.ok) {
            const albums = await res.json();
            dispatch(loadAlbums(albums.albums));
            return albums;
        }
    } catch (err) {
        return err;
    }
};

export const getLikedAlbums = (userId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/users/${userId}/liked_albums`);
        if (res.ok) {
            const likedAlbums = await res.json();
            dispatch(loadLikedAlbums(likedAlbums.liked_albums));
            return likedAlbums;
        }
    } catch (err) {
        console.error(err);
    }
};

export const likeAlbum = (userId, albumId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/users/${userId}/liked_albums/${albumId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId, album_id: albumId }),
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(addLikedAlbum(userId, albumId));
            return data;
        }
    } catch (err) {
        console.error(err);
    }
};

export const unlikeAlbum = (userId, albumId) => async (dispatch) => {
    try {
        const res = await fetch(
            `/api/users/${userId}/liked_albums/${albumId}`,
            {
                method: "DELETE",
            }
        );
        if (res.ok) {
            dispatch(removeLikedAlbum(userId, albumId));
            return { message: `Album ${albumId} unliked by user ${userId}` };
        }
    } catch (err) {
        console.error(err);
    }
};


const initialState = {
    liked_albums: {},
};

// const initialState = {}



const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALBUMS: {
            const newState = { ...state };
            action.albums.forEach((album) => {
                newState[album.id] = album;
            });
            return newState;
        }
        case LOAD_LIKED_ALBUMS: {
            const newState = { ...state };
            action.likedAlbums.forEach((likedAlbum) => {
                newState.liked_albums[likedAlbum.id] = likedAlbum;
            });
            return newState;
        }
        case LOAD_ALBUM: {
            const newState = { ...state };
            return { ...newState, [action.album.id]: action.album };
        }
        case ADD_LIKED_ALBUM: {
            const newState = { ...state };
            const userId = action.userId;
            const albumId = action.albumId;
            if (newState.liked_albums[userId]) {
                newState.liked_albums[userId].push(albumId);
            } else {
                newState.liked_albums[userId] = [albumId];
            }
            return newState;
        }
        case REMOVE_LIKED_ALBUM: {
            const newState = { ...state };
            const userId = action.userId;
            const albumId = action.albumId;
            if (newState.liked_albums[userId]) {
                newState.liked_albums[userId] = newState.liked_albums[userId].filter((id) => id !== albumId);
            }
            return newState;
        }
        // Still need to add updating, deleting, etc.
        default: {
            return state;
        }
    }
};

export default albumReducer;