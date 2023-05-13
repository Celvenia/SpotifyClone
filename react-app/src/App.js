import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Songs from "./components/Songs";
import SongInfo from "./components/SongInfo"
import Albums from "./components/Albums";
import Sidebar from "./components/Sidebar"
import Playlist from "./components/Playlist";
import Search from "./components/Search";
import Home from "./components/Home";
import Player from "./components/Player";
// import Testing from "./components/Testing";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    <div className="main-container">
        <Sidebar isLoaded={isLoaded} />
        <Navigation isLoaded={isLoaded} />

        <div className="main-content">
          {isLoaded && (
            <Switch>
              <Route path="/login" >
                <LoginFormPage />
              </Route>
              <Route path="/signup">
                <SignupFormPage />
              </Route>
              <Route exact path="/songs">
                <Songs />
              </Route>
              <Route exact path="/songs/:songId">
                <SongInfo />
              </Route>
              <Route path="/albums">
                <Albums />
              </Route>
              <Route path="/playlists/:playlistId">
                <Playlist />
              </Route>
              <Route path="/search">
                <Search />
              </Route>
              <Route path="/">
                <Home />
              </Route>
              {/* <Route path="/testing">
            <Testing />
          </Route> */}
            </Switch>
          )}
        </div>

    </div>
          <Player />
    </>
  );
}

export default App;
