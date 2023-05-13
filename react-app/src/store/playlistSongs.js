const LOAD_PLAYLIST_SONGS = "/playlists/LOAD_PLAYLIST_SONGS";
const ADD_PLAYLIST_SONGS = "/playlists/ADD_PLAYLIST_SONGS";
const REMOVE_PLAYLIST_SONG = "/playlists/REMOVE_PLAYLIST_SONG"

// action creators - define actions( objects with type/data )
const loadPlaylistSongs = (songs) => ({
    type: LOAD_PLAYLIST_SONGS,
    songs,
});

const addPlaylistSong = (song) => ({
    type: LOAD_PLAYLIST_SONGS,
    song,
});

const removePlaylistSong = (songId) => ({
    type: REMOVE_PLAYLIST_SONG,
    songId,
});

export const getPlaylistSongs = (playlistId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/playlists/${playlistId}/songs`);
        if (res.ok) {
            const songs = await res.json();
            dispatch(loadPlaylistSongs(songs));
            return songs
        }
    } catch (err) {
        return err
    }
};

const initialState = {};

// reducer
const playlistSongsReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOAD_PLAYLIST_SONGS: {
            const newState = {};
            action.songs.forEach((song) => {
                newState[song.id] = song;
            });
            return newState;
        }
        // case LOAD_PLAYLIST: {
        //     const newState = { ...state };
        //     return { ...newState, [action.playlist.id]: action.playlist };
        // }

        // case POST_PLAYLIST: {
        //     const newState = { ...state };
        //     return { ...newState, [action.playlist.id]: action.playlist };
        // }

        // case DELETE_PLAYLIST: {
        //     const newState = { ...state };
        //     delete newState[action.spotId];
        //     return newState;
        // }

        // case UPDATE_PLAYLIST: {
        //     const newState = { ...state }
        //     return { ...newState, [action.playlist.id]: action.playlist }
        // }

        default: {
            return state;
        }
    }
}

export default playlistSongsReducer;
