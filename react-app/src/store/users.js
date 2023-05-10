// constant variables for action creator
const LOAD_USERS = "/users/LOAD_USERS";
const LOAD_USER = "/users/LOAD_USER";
const UPDATE_USER = "/users/UPDATE_USER";
const DELETE_USER = "/users/DELETE_USER";

const LOAD_FOLLOWERS = "/users/LOAD_FOLLOWERS"
const LOAD_FOLLOWING = "/users/LOAD_FOLLOWING"
const ADD_FOLLOWER = "/users/ADD_FOLLOWER"
const REMOVE_FOLLOWER = "/users/REMOVE_FOLLOWER"



// action creators - define actions( objects with type/data )
const loadUsers = (users) => ({
    type: LOAD_USERS,
    users,
});

const loadUser = (user) => ({
    type: LOAD_USER,
    user,
});


const deleteUser = (userId) => ({
    type: DELETE_USER,
    userId,
});

const updateUser = (user) => ({
    type: UPDATE_USER,
    user
})

const loadFollowers = (followers) => ({
    type: LOAD_FOLLOWERS,
    followers,
});

const loadFollowing = (following) => ({
    type: LOAD_FOLLOWING,
    following,
});

const addFollower = (follower) => ({
    type: ADD_FOLLOWER,
    follower,
});

const addFollowing = (following) => ({
    type: ADD_FOLLOWER,
    following,
});

const removeFollower = (follower) => ({
    type: REMOVE_FOLLOWER,
    follower,
});

const removeFollowing = (following) => ({
    type: REMOVE_FOLLOWING,
    following,
});

// thunk action creators - for asynchronous code, i.e fetch calls prior to dispatching action creators
export const getUsers = () => async (dispatch) => {
    try {
        const res = await fetch("/api/users");
        if (res.ok) {
            const users = await res.json();
            dispatch(loadUsers(users.users));
            return users;
        }
    } catch (err) {
        return err
    }
};

export const getUser = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`);

    if (res.ok) {
        const user = await res.json();
        dispatch(loadUser(user));
        return user;
    } else return res.json()
};



// export const postASong = (song) => async (dispatch) => {

//   const res = await fetch(`/api/songs/${song.id}`, {
//     method: "POST",
//     body: JSON.stringify(payload),
//   });

//   if (res.ok) {
//     const song = await res.json();
//     dispatch(postSong(song));
//     return song;
//   } else return res.json()
// };

export const deleteAUser = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`, {
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
    if (res.ok) {
        const data = await res.json();
        dispatch(updateSong({ ...song, ...data }))
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
            const newState = { ...state }
            return { ...newState, [action.song.id]: action.song }
        }

        default: {
            return state;
        }
    }
};

export default songReducer;