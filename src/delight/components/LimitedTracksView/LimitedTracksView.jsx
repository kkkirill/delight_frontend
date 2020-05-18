import React from 'react';
import classnames from 'classnames';

import './LimitedTracksView.css';
import Track from '../../containers/Track';
import {defaultPlaylistImage} from '../../constants';

function LimitedTracksView({tracks, playlist, view_amount, title, optionsFunction, optionsText, className, setPlaylistVisibility, setCurrentShowingPlaylist}) {
  let seeAllButtonVisible, visibleTracks;

  if (!playlist) {
    playlist = {
      songs: tracks,
      name: title,
      image: defaultPlaylistImage,
      artist: 'Generated for you'
    };
  } else {
    tracks = playlist.songs;
  }

  if (view_amount && tracks) {
    seeAllButtonVisible = tracks.length > view_amount;
    visibleTracks = tracks.slice(0, view_amount);
  } else {
    seeAllButtonVisible = false;
    visibleTracks = tracks;
  }

  const onSeeAllButtonClick = () => {
    setCurrentShowingPlaylist(playlist);
    setPlaylistVisibility(true);
  };

  return (
    <div className={classnames('limited-tracks-view', className)}>
      {title && <p className="limited-tracks-view__title">{title}</p>}
      {visibleTracks && visibleTracks.map((track, index) => (
        <Track playlist={playlist} index={index}>{optionsText && <button onClick={() => optionsFunction(track.id)}>{optionsText}</button>}</Track>
      ))}

      {seeAllButtonVisible &&
      <button className="limited-tracks-view__see-all" onClick={onSeeAllButtonClick}>
        see all...
      </button>
      }
    </div>
  );
}

export default LimitedTracksView;
