import React, {useState, useEffect} from 'react';
import ReactPlayer from 'react-player';
import classnames from 'classnames';
import {transformTime} from '../../utils';

import './MainPlayer.css';
import {Slider} from '@material-ui/core';

import {playIconURL, pauseIconURL} from '../../constants';
import MultipleSelection from '../MultipleSelection/MultipleSelection';
import Dropdown from '../Dropdown/Dropdown';

function MainPlayer({
                      className,
                      playlist,
                      playlists,
                      trackIndex,
                      currentTime,
                      setPlaying,
                      playing,
                      setCurrentPlayingTime,
                      setPlaylistVisibility,
                      tracksListVisibility,
                      setCurrentTrack,
                      loadTrackInfo,
                      fullTrackInfo,
                      setCurrentShowingPlaylist,
                      likeTrack,
                      addTrackToPlaylist,
                      authentication
                    }) {
  const tracks = playlist.songs || [];
  const track = tracks[trackIndex];
  const trackId = track && track.id;
  const [duration, setDuration] = useState(0);
  const [player, setPlayer] = useState();
  const authorized = authentication.get('status') === 1;

  const artists = track && track.artists && track.artists.map(each => each.stageName).join(', ');

  playlists = playlists.results || playlists || [];

  useEffect(() => {
    if (trackId) {
      loadTrackInfo(track.id);
    }
  }, [trackId]);

  const onProgress = (event) => {
    setCurrentPlayingTime(event.playedSeconds);
  };

  const onDuration = (value) => {
    setDuration(value);
  };

  const onEnded = (value) => {
    const tracksAmount = tracks.length;
    setCurrentTrack(trackIndex < tracksAmount - 1 ? trackIndex + 1 : 0);
  };

  const onSliderValueChange = (event, value) => {
    setCurrentPlayingTime(value);
    player.seekTo(value);
  };

  const onPlayButtonClick = (event, value) => {
    setPlaying(!playing);
  };

  const onShowPlaylistButtonClick = (event, value) => {
    if (!tracksListVisibility) {
      setCurrentShowingPlaylist(playlist);
    }

    setPlaylistVisibility(!tracksListVisibility);
  };

  const onNextButtonClick = (event, value) => {
    const tracksAmount = tracks.length;
    setCurrentTrack(trackIndex < tracksAmount - 1 ? trackIndex + 1 : 0);
    setPlaying(true);
  };

  const onFavClick = () => {
    likeTrack(trackId);
  };

  const onAddTrackToPlaylistButtonClick = (playlistId) => {
    addTrackToPlaylist(trackId, playlistId);
  };

  const ref = player => {
    setPlayer(player);
  };

  if (track) {
    return (
      <div className={classnames(className, 'main-player')}>
        <ReactPlayer
          className="react-player"
          ref={ref}
          url={track.file}
          playing={playing}
          onProgress={onProgress}
          onDuration={onDuration}
          onEnded={onEnded}
        />

        <button className="main-player__play-button" onClick={onPlayButtonClick}>
          {playing ?
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

        <button className="main-player__show-playlist-button" onClick={onShowPlaylistButtonClick}>
          <p>Открыть</p>
        </button>

        <button className="main-player__show-playlist-button" onClick={onNextButtonClick}>
          <p>Следующая</p>
        </button>

        <div className="main-player__main-content">
          <p className="main-player__name-author-text">
            <span className="main-player__name">{track.title}</span> - <span
            className="main-player__author">{artists}</span>
          </p>
          <Slider
            value={currentTime}
            onChange={onSliderValueChange}
            min={0}
            max={duration}
            valueLabelFormat={transformTime(currentTime)}
            valueLabelDisplay="auto"
          />
        </div>
        <div className="main-player__length-container">
          <p className="main-player__length">{transformTime(currentTime)}</p>
        </div>
        {authorized &&
        <div className="main-player__options">
          <Dropdown upper={true} title="Плейлисты">
            <p className="main-player__playlists-add-title">Добавить трек в плейлист:</p>
            <div className="main-player__playlists-list">
              {playlists.slice(2, 10000).map((playlist) => (
                <button
                  className="main-player__playlists-button"
                  onClick={() => onAddTrackToPlaylistButtonClick(playlist.id)}>{playlist.name}
                </button>
              ))}
            </div>
          </Dropdown>
          <button className="main-player__add-icon" onClick={onFavClick}>В любимые</button>
        </div>
        }
      </div>
    );
  } else {
    return <div className={classnames(className, 'main-player')}/>;
  }
}

export default MainPlayer;