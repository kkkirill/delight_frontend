import React from 'react';
import classnames from 'classnames';

import './PlaylistOverview.css';

function PlaylistOverview(
  {
    playlist,
    className,
    setCurrentShowingPlaylist,
    setCurrentTrack,
    setPlaylistVisibility,
    children
  }) {
  const openPlaylistButtonClick = () => {
    setCurrentShowingPlaylist(playlist);
    setPlaylistVisibility(true);
  };

  return (
    <div className={classnames('playlist-overview', className)}>
      <button className="playlist-overview__wrapper" onClick={openPlaylistButtonClick}>
        <div className="playlist-overview__title-wrapper">
          <p className="playlist-overview__title">{playlist.name}</p>
        </div>
        <img className="playlist-overview__image" src={playlist.photo}/>
      </button>
      {children}
    </div>
  );
}

export default PlaylistOverview;