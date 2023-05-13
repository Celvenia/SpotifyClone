import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import songReducer from './songs';
import playlistReducer from './playlists';
import albumReducer from './albums'
import playlistSongsReducer from './playlistSongs';
import userReducer from './users';
import followerReducer from './followers';

const rootReducer = combineReducers({
  session,
  songReducer,
  playlistReducer,
  albumReducer,
  playlistSongsReducer,
  userReducer,
  followerReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
