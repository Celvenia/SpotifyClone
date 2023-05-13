const LOAD_PLAYLIST_SONGS = "/playlists/LOAD_PLAYLIST_SONGS";
const ADD_PLAYLIST_SONG = "/playlists/ADD_PLAYLIST_SONG";
const REMOVE_PLAYLIST_SONG = "/playlists/REMOVE_PLAYLIST_SONG"

// action creators - define actions( objects with type/data )
const loadPlaylistSongs = (songs) => ({
    type: LOAD_PLAYLIST_SONGS,
    songs,
});

const addPlaylistSong = (playlist) => ({
    type: ADD_PLAYLIST_SONG,
    playlist,
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

export const updatePlaylistWithSong = (playlistId, songId) => async (dispatch) => {
    try {
      const res = await fetch(`/api/playlists/${playlistId}/songs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ song_id: songId })
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(addPlaylistSong(data));
        return data;
      }
    } catch (err) {
      return err;
    }
  };

const initialState = {};

// reducer
const playlistSongsReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_PLAYLIST_SONGS: {
        const newState = {};
        action.songs.forEach((song) => {
          if (song.id) {
            newState[song.id] = song;
          }
        });
        return newState;
      }
      case ADD_PLAYLIST_SONG: {
        const newState = {...state};
        action.playlist.songs.forEach((song) => {
            if (song.id) {
              newState[song.id] = song;
            }
          });
        return newState;
      }
      default: {
        return state;
      }
    }
  };

export default playlistSongsReducer;
