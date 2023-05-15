// constant variables for action creator
const LOAD_USERS = "/users/LOAD_USERS";
const LOAD_USER = "/users/LOAD_USER";

// action creators - define actions( objects with type/data )
const loadUsers = (users) => ({
    type: LOAD_USERS,
    users,
});

const loadUser = (user) => ({
    type: LOAD_USER,
    user,
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

        default: {
            return state;
        }
    }
};

export default userReducer;