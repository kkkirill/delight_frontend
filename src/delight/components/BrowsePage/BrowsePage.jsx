import React from 'react';

import './BrowsePage.css';
import classnames from "classnames";
import NavigationPanel from '../../containers/NavigationPanel';
import LimitedPlaylistsView from "../LimitedPlaylistsView/LimitedPlaylistsView";
import {playlists} from "../../constants";

function BrowsePage({className}) {
  return (
      <div className={classnames("browse-page", className)}>
        <NavigationPanel/>

        <div className="browse-page__content">
        <LimitedPlaylistsView
            playlists={playlists}
            title="Favorite"
        />
        <LimitedPlaylistsView
            playlists={playlists}
            title="New"
        />
        <LimitedPlaylistsView
            playlists={playlists}
            title="Something"
        />
        </div>

      </div>
  );
}

export default BrowsePage;