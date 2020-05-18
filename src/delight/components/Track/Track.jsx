import React from 'react';
import classnames from 'classnames';

import './Track.css';
import {pauseIconURL, playIconURL} from '../../constants';

function Track({
                 playlist,
                 index,
                 currentTrack,
                 currentPlaylist,
                 playing,
                 authentication,
                 className,
                 setCurrentTrack,
                 setPlaying,
                 setCurrentPlaylist,
                 children,
                 likeTrack
               }) {
  const tracks = playlist.songs;
  const track = tracks[index];
  const authorized = authentication.get('status') + '' === '1';
  const isCurrentTrack = currentPlaylist && currentPlaylist.songs && currentPlaylist.songs[currentTrack] && track.id === currentPlaylist.songs[currentTrack].id;
  const artists = track && track.artists && track.artists.map(each => each.stageName).join(', ');

  const onFavClick = () => {
    likeTrack(track.id);
  };

  const onPlayButtonClick = () => {
    if (isCurrentTrack) {
      setPlaying(!playing);
    } else {
      setCurrentPlaylist(playlist);
      setCurrentTrack(index);
      setPlaying(true);
    }
  };

  return (
    <div className={classnames('track', className)}>
      <button className="track__play-button" onClick={onPlayButtonClick}>
        {isCurrentTrack && playing ?
          <img
            className="main-player__play-button-icon"
            src={playIconURL}
          />
          : <img
            className="main-player__play-button-icon"
            src={pauseIconURL}
          />
        }
      </button>
      <div className="track__main-content">
        <p className="track__name-author-text">
          <span className="track__name">{track.title || track.name}</span> - <span
          className="track__author">{artists}</span>
        </p>
      </div>

      <div className="track__options">
        {children || authorized && <button className="track__add-icon" onClick={onFavClick}>В любимые</button>}
      </div>
    </div>
  );
}

export default Track;