
// action type
const LOAD_SONGS = 'songs/LOAD_SONGS'

// action creator
const load = songs => ({
    type: LOAD_SONGS,
    songs
})

// thunk
export const loadSongs = () => async (dispatch) => {
    let res = await fetch('/api/songs')
    if(res.ok) {
        res = await res.json()
        dispatch(load(res))
        return res
    }

}

// state
const initialState = {}

const songs = (state=initialState, action) => {
    switch(action.type){
        case LOAD_SONGS:
            return {...state, ...action.songs}
        default:
            return state
    }
}

export default songs