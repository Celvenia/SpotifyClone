
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
        let data = await res.json()
        dispatch(load(data))
        return res
    }

}

// state
const initialState = {}

// reducer
const songs = (state=initialState, action) => {
    switch(action.type){
        case LOAD_SONGS:
            const newState = {...state}
            action.songs.songs.forEach((song) => {
                newState[song.id] = song;
            });
            return newState
        default:
            return state
    }
}

export default songs