const LOAD_FOLLOWERS = "/followers/LOAD_FOLLOWERS"
const ADD_FOLLOWER = "/followers/ADD_FOLLOWER"
const REMOVE_FOLLOWER = "/followers/REMOVE_FOLLOWER"


const loadFollowers = (followers) => ({
    type: LOAD_FOLLOWERS,
    followers,
});

const addFollower = (follower) => ({
    type: ADD_FOLLOWER,
    follower,
});

const removeFollower = (follower) => ({
    type: REMOVE_FOLLOWER,
    follower,
});


// thunk action creators - for asynchronous code, i.e fetch calls prior to dispatching action creators
export const getFollowers = () => async (dispatch) => {
    try {
        const res = await fetch("/api/followers");
        if (res.ok) {
            const followers = await res.json();
            dispatch(loadFollowers(followers.followers));
            return followers;
        }
    } catch (err) {
        return err
    }
};

export const getFollower = (followerId) => async (dispatch) => {
    const res = await fetch(`/api/followers/${followerId}`);

    if (res.ok) {
        const follower = await res.json();
        dispatch(loadFollower(follower));
        return follower;
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

// export const deleteAUser = (userId) => async (dispatch) => {
//     const res = await fetch(`/api/followers/${userId}`, {
//         method: "DELETE",
//     });

//     if (res.ok) {
//         const song = await res.json();
//         dispatch(deleteSong(songId));
//         return song;
//     } else return res.json()
// };

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

        case LOAD_followers: {
            const newState = { ...state };
            action.followers.forEach((user) => {
                newState[user.id] = user;
            });
            return newState;
        }

        case LOAD_USER: {
            const newState = { ...state };
            return { ...newState, [action.user.id]: action.user };
        }
        default: {
            return state;
        }
    }
};

export default userReducer;