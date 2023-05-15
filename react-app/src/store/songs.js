// constant variables for action creator
const LOAD_SONGS = "/songs/LOAD_SONGS";
const LOAD_SONG = "/songs/LOAD_SONG";
const POST_SONG = "/songs/POST_SONG";
const UPDATE_SONG= "/songs/UPDATE_SONG";
const DELETE_SONG = "/songs/DELETE_SONG";

// action creators - define actions( objects with type/data )
const loadSongs = (songs) => ({
  type: LOAD_SONGS,
  songs,
});

const loadSong = (song) => ({
  type: LOAD_SONG,
  song,
});

const postSong = (song) => ({
  type: POST_SONG,
  song,
});

const deleteSong = (songId) => ({
  type: DELETE_SONG,
  songId,
});

const updateSong = (song) => ({
  type: UPDATE_SONG,
  song
})

// thunk action creators - for asynchronous code, i.e fetch calls prior to dispatching action creators
export const getSongs = () => async (dispatch) => {
  try {
    const res = await fetch("/api/songs");
    if (res.ok) {
      const songs = await res.json();
      dispatch(loadSongs(songs.songs));
      return songs;
  }
  } catch (err) {
    return err
  }
};

export const getSong = (songId) => async (dispatch) => {
  const res = await fetch(`/api/songs/${songId}`);

  if (res.ok) {
    const song = await res.json();
    dispatch(loadSong(song));
    return song;
  } else return res.json()
};


export const createASong = (data) => async (dispatch) => {
  try {
    const res = await fetch(`/api/songs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const song = await res.json();
      dispatch(postSong(song));
      return song;
    } else return res.json()
  } catch (error) {
      throw error;
  }
};


export const deleteASong = (songId) => async (dispatch) => {
  const res = await fetch(`/api/songs/${songId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const song = await res.json();
    dispatch(deleteSong(songId));
    return song;
  } else return res.json()
};

export const updateASong = (payload, song) => async (dispatch) => {
  const res = await fetch(`/api/songs/${song.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if(res.ok) {
    const data = await res.json();
     dispatch(updateSong({song,...data}))
     return data
  } else return res.json()
}


const initialState = {};

// reducer
const songReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_SONGS: {
      const newState = { ...state };
      action.songs.forEach((song) => {
          newState[song.id] = song;
      });
      return newState;
    }

    case LOAD_SONG: {
      const newState = { ...state };
      return { ...newState, [action.song.id]: action.song };
    }

    case POST_SONG: {
      const newState = { ...state };
      return { ...newState, [action.song.id]: action.song };
    }

    case DELETE_SONG: {
      const newState = { ...state };
      delete newState[action.spotId];
      return newState;
    }

    case UPDATE_SONG: {
      const newState = { ...state}
        return {...newState, [action.song.id]: action.song}
    }

    default: {
      return state;
    }
  }
};

export default songReducer;