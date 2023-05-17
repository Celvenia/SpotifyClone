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

export const followUser = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}/followers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const user = await res.json();
      dispatch(addFollower(user));
      return user;
    } else {
      const data = await res.json();
      return data;
    }
  };

  export const unfollowUser = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}/followers`, {
      method: "DELETE",
    });
    if (res.ok) {
      const user = await res.json();
      dispatch(removeFollower(user));
      return user;
    } else {
      return res.json();
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
        case ADD_FOLLOWER: {
            const newState = {...state }
            
            return { ...newState, [action.follower.id]: action.follower}
        }
        case REMOVE_FOLLOWER: {
            const newState = {...state}
            delete newState[action.follower.id]
            return newState
        }
        default: {
            return state;
        }

    }
};

export default followerReducer;