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
<<<<<<< HEAD
=======
import Playlist from "./components/Playlist";
import Search from "./components/Search";
>>>>>>> chris
import Home from "./components/Home";
// import Testing from "./components/Testing";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="main-container">
        <Sidebar isLoaded={isLoaded} />
        <Navigation isLoaded={isLoaded} />
        {/* <Home isLoaded={isLoaded}/> */}

<<<<<<< HEAD
      <Navigation isLoaded={isLoaded} />
      <Sidebar isLoaded={isLoaded} />
      <Home isLoaded={isLoaded} />

      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/songs">
            <Songs />
          </Route>
          <Route path="/albums">
            <Albums />
          </Route>
          {/* <Route path="/testing">
=======
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
              {/* <Route path="/testing">
>>>>>>> chris
            <Testing />
          </Route> */}
            </Switch>
          )}
        </div>

    </div>
  );
}

export default App;
