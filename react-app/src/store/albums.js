
// action type
const LOAD_ALBUM = 'albums/LOAD_ALBUM'

// action creator
const load = albums => ({
    type: LOAD_ALBUM,
    payload: albums
})

// thunk
export const loadAlbums = () => async (dispatch) => {
    let res = await fetch('/api/albums')
    console.log("thunk: ", res)
    if(res.ok) {
        let data = await res.json()
        console.log("res.ok thunk: ", data)
        dispatch(load(data))
        return data
    }

}

// state
const initialState = {}

// reducer
const albums = (state=initialState, action) => {
    switch(action.type){
        case LOAD_ALBUM:
            const newState = {...state}
            console.log("reducer: ", action.payload.albums)
            action.payload.albums.forEach((album) => {
                newState[album.id] = album;
            });
            return newState
        default:
            return state
    }
}

export default albums
