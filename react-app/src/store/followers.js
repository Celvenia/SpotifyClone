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
export const getFollowers = (id) => async (dispatch) => {
    try {
        const res = await fetch(`/api/users/${id}/followers`);
        if (res.ok) {
            const followers = await res.json();
            dispatch(loadFollowers(followers.followers));
            return followers;
        }
    } catch (err) {
        return err
    }
};


const initialState = {};

// // reducer
const followerReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOAD_FOLLOWERS: {
            const newState = { ...state };
            action.followers.forEach((user) => {
                newState[user.id] = user;
            });
            return newState;
        }
        default: {
            return state;
        }

    }
};

export default followerReducer;