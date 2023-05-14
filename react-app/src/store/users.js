// constant variables for action creator
const LOAD_USERS = "/users/LOAD_USERS";
const LOAD_USER = "/users/LOAD_USER";
const UPDATE_USER = "/users/UPDATE_USER";
const DELETE_USER = "/users/DELETE_USER";


// action creators - define actions( objects with type/data )
const loadUsers = (users) => ({
    type: LOAD_USERS,
    users,
});

const loadUser = (user) => ({
    type: LOAD_USER,
    user,
});

const updateUser = (user) => ({
    type: UPDATE_USER,
    user
})

const deleteUser = (userId) => ({
    type: DELETE_USER,
    userId,
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


// export const updateASong = (payload, song) => async (dispatch) => {
//     const res = await fetch(`/api/songs/${song.id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//     });
//     if (res.ok) {
//         const data = await res.json();
//         dispatch(updateSong({ ...song, ...data }))
//         return data
//     } else return res.json()
// }


const initialState = {};

// // reducer
const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOAD_USERS: {
            const newState = { ...state };
            action.users.forEach((user) => {
                newState[user.id] = user;
            });
            return newState;
        }

        case LOAD_USER: {
            const newState = { ...state };
            return { ...newState, [action.user.id]: action.user };
        }

        // case DELETE_SONG: {
        //     const newState = { ...state };
        //     delete newState[action.spotId];
        //     return newState;
        // }

        // case UPDATE_SONG: {
        //     const newState = { ...state }
        //     return { ...newState, [action.song.id]: action.song }
        // }

        default: {
            return state;
        }
    }
};

export default userReducer;