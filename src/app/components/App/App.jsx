import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import HomePage from '../../../delight/containers/HomePage';
import BrowsePage from '../../../delight/components/BrowsePage/BrowsePage';
import ProfilePage from '../../../delight/containers/ProfilePage';
import MainPlayer from '../../../delight/containers/MainPlayer';
import CurrentPlaylist from '../../../delight/containers/CurrentPlaylist';
import AddPostPage from '../../../delight/containers/AddPostPage';
import LogInPage from '../../../delight/containers/LogInPage';
import SignUpPage from '../../../delight/containers/SignUpPage';
import PageNotFound from '../../../delight/components/PageNotFound/PageNotFound';
import UploadTrackPage from '../../../delight/containers/UploadTrackPage';

import './App.css';

function App({loadAuthenticationData, autoIncreasingUpdateCounter}) {
  useEffect(() => {
    loadAuthenticationData();
    autoIncreasingUpdateCounter();
  })

  return (
      <div className="app">
        <div className="app__content-space">
          <Router>
            <Switch>
              <Route path="/" exact component={HomePage}/>
              <Route path="/browse" component={BrowsePage}/>
              <Route path="/profile/:id" component={ProfilePage}/>
              <Route path="/add" component={AddPostPage}/>
              <Route path="/login" component={LogInPage}/>
              <Route path="/signup" component={SignUpPage}/>
              <Route path="/upload_track" component={UploadTrackPage}/>
              <Route path="*" component={PageNotFound}/>
            </Switch>
          </Router>

          <CurrentPlaylist/>
        </div>

        <MainPlayer/>
      </div>
  );
}

export default App;
