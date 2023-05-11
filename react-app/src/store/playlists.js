// constant variables for action creator
const LOAD_PLAYLIST = "/playlists/LOAD_PLAYLIST";
const LOAD_PLAYLISTS = "/playlists/LOAD_PLAYLISTS";
const POST_PLAYLIST = "/playlists/POST_PLAYLIST";
const UPDATE_PLAYLIST = "/playlists/UPDATE_PLAYLIST";
const DELETE_PLAYLIST  = "/playlists/DELETE_PLAYLIST";

// action creators - define actions( objects with type/data )
const loadPlaylist = (playlist) => ({
  type: LOAD_PLAYLIST,
  playlist,
});

const loadPlaylists = (playlists) => ({
  type: LOAD_PLAYLISTS,
  playlists,
});

const deletePlaylist = (playlistId) => ({
  type: DELETE_PLAYLIST,
  playlistId,
});

const updatePlaylist = (playlist) => ({
  type: UPDATE_PLAYLIST ,
  playlist
})

// thunk action creators - for asynchronous code, i.e fetch calls prior to dispatching action creators
export const getPlaylists = () => async (dispatch) => {
  try {
    const res = await fetch("/api/playlists");
    if (res.ok) {
      const playlists = await res.json();
      dispatch(loadPlaylists(playlists.playlists));
      return playlists;
  }
  } catch (err) {
    return err
  }
};

export const getPlaylist = (playlistId) => async (dispatch) => {
  const res = await fetch(`/api/playlists/${playlistId}`);

  if (res.ok) {
    const playlist = await res.json();
    dispatch(loadPlaylist(playlist));
    return playlist;
  } else return res.json()
};


export const createAPlaylist = (data) => async (dispatch) => {
  try {
    const res = await fetch(`/api/playlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const playlist = await res.json();
      dispatch(loadPlaylist(playlist));
      return playlist;
    } else return res.json()
  } catch (error) {
      throw error;
  }
};


export const deleteAPlaylist = (playlistId) => async (dispatch) => {
  const res = await fetch(`/api/playlists/${playlistId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const playlist = await res.json();
    console.log(playlist, 'testing')
    dispatch(deletePlaylist(playlistId));
    return playlist;
  } else return res.json()
};

export const updateAPlaylist = (payload, playlist) => async (dispatch) => {
  const res = await fetch(`/api/playlists/${playlist.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if(res.ok) {
    const data = await res.json();
     dispatch(updatePlaylist({...playlist, ...data}))
     return data
  } else return res.json()
}


const initialState = {};

// reducer
const playlistReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_PLAYLISTS: {
      const newState = { ...state };
      action.playlists.forEach((playlist) => {
          newState[playlist.id] = playlist;
      });
      return newState;
    }
    case LOAD_PLAYLIST: {
      const newState = { ...state };
      return { ...newState, [action.playlist.id]: action.playlist };
    }

    case POST_PLAYLIST: {
      const newState = { ...state };
      return { ...newState, [action.playlist.id]: action.playlist };
    }

    case DELETE_PLAYLIST: {
      const newState = { ...state };
      delete newState[action.playlistId];
      return newState;
    }

    case UPDATE_PLAYLIST: {
      const newState = { ...state}
        return {...newState, [action.playlist.id]: action.playlist}
    }

    default: {
      return state;
    }
  }
};

export default playlistReducer;