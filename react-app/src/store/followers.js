const LOAD_FOLLOWERS = "/users/LOAD_FOLLOWERS"
const ADD_FOLLOWER = "/users/ADD_FOLLOWER"
const REMOVE_FOLLOWER = "/users/REMOVE_FOLLOWER"


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

