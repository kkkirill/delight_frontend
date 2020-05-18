import React from 'react';
import classnames from 'classnames';

import './LimitedPlaylistsView.css';
import PlaylistOverview from '../../containers/PlaylistOverview';
import HorizontalScroll from '../HorizontalScroll/HorizontalScroll';

function LimitedPlaylistsView({playlists, title, className, playlistOverviewChildren}) {
  const results = playlists.results || playlists || [];

  const data = results.map((playlist) => (
    <div className="limited-playlists-view__playlist-cell" key={playlist.id}>
      <PlaylistOverview
        className="limited-playlists-view__playlist"
        playlist={playlist}
        children={playlistOverviewChildren}
      />
    </div>
  ));

  return (
    <div className={classnames('limited-playlists-view', className)}>
      <p className="limited-playlists-view__title">{title}</p>
      <HorizontalScroll>
        {data}
      </HorizontalScroll>
    </div>
  );
}

export default LimitedPlaylistsView;
