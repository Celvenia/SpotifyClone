
const LOAD_FOLLOWING = "/users/LOAD_FOLLOWING"
const ADD_FOLLOWING = "/users/ADD_FOLLOWING"
const REMOVE_FOLLOWING = "/users/REMOVE_FOLLOWING"

const loadFollowing = (following) => ({
    type: LOAD_FOLLOWING,
    following,
});

const removeFollowing = (following) => ({
    type: REMOVE_FOLLOWING,
    following,
});

const addFollowing = (following) => ({
    type: ADD_FOLLOWER,
    following,
});