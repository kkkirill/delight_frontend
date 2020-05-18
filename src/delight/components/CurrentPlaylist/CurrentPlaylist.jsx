import React, {useState, useEffect, useReducer} from 'react';
import classnames from 'classnames';

import './CurrentPlaylist.css';
import LimitedTracksView from '../LimitedTracksView/LimitedTracksView';
import ImageUploadInput from '../../containers/ImageUploadInput';

function CurrentPlaylist({className, isPlaylistVisible, playlist, authentication, dislikeTrack, imageUploadInfo, getPlaylist, updatePlaylistInfo, removeTrackFromPlaylist, setPlaylistVisibility}) {
  const [changing, setChanging] = useState(false);
  const [playlistName, setPlaylistName] = useState(playlist.name);
  const [isPlaylistPrivate, setIsPlaylistPrivate] = useState(playlist.isPrivate);
  const [updateValue, forceUpdate] = useReducer(x => x + 1, 0);

  const changeable = playlist.id
    && ! ['Избранное', 'Мои песни'].includes(playlist.name)
    && authentication.get('status') + '' === '' + 1
    && playlist.owner
    && playlist.owner.id === authentication.get('data').id;

  const onCloseButtonClick = () => {
    setChanging(false);
    setPlaylistVisibility(false);
  };

  const onEditButtonClick = () => {
    setChanging(true);
  };

  const onPlaylistNameChange = ({target: {value}}) => {
    setPlaylistName(value);
  };

  const onSubmitChanges = e => {
    e.preventDefault();

    updatePlaylistInfo(playlist.id, {
      name: playlistName,
      isPrivate: isPlaylistPrivate,
      photo: imageUploadInfo.getIn(['data', 'file']),
      owner: authentication.get('data').id
    });

    setChanging(false);
  };

  const onPlaylistPrivateChange = ({target: {checked}}) => {
    setIsPlaylistPrivate(checked);
  };

  const onDislikeTrackClick = (id) => {
    dislikeTrack(id);
    forceUpdate();
  }

  const onRemoveTrackClick = (id) => {
    removeTrackFromPlaylist(id, playlist.id);
    forceUpdate();
  }

  const optionsFunction = playlist.name === 'Избранное' ? onDislikeTrackClick : onRemoveTrackClick;

  useEffect(() => {
    if (playlist.id && playlist.owner) {
      getPlaylist(playlist.owner.id || playlist.owner, playlist.id);
    }
  }, [playlist.id, changing, updateValue, isPlaylistVisible]);

  useEffect(() => {
    setPlaylistName(playlist.name);
    setIsPlaylistPrivate(playlist.isPrivate);
  }, [playlist.id, playlist.isPrivate]);

  return (
    <div
      className={classnames(className, 'current-playlist', {'current-playlist_hidden': !isPlaylistVisible})}>
      <div className="current-playlist__content">
        <div className="current-playlist__header">
          <button className="current-playlist__close-button" onClick={onCloseButtonClick}>Закрыть
          </button>
        </div>

        {changing ?
          <form className="current-playlist__info-section" onSubmit={onSubmitChanges}>
            <ImageUploadInput imageType="ALI"/>
            <div className="current-playlist__info-section-text">
              <input type="text" value={playlistName} className="current-playlist__title-input"
                     onChange={onPlaylistNameChange}/>
              <div className="current-playlist__private-checkbox-container">
                <p>Приватный</p>
                <input type="checkbox" checked={isPlaylistPrivate}
                       onChange={onPlaylistPrivateChange}/>
              </div>
            </div>
            <div className="current-playlist__options">
              <button type="submit" className="current-playlist__change-button">Сохранить</button>
            </div>
          </form>
          :
          <div className="current-playlist__info-section">
            <img className="current-playlist__image" src={playlist.photo}/>
            <div className="current-playlist__info-section-text">
              <p className="current-playlist__title">{playlist.name}</p>
              <p
                className="current-playlist__artist">{playlist.owner && playlist.owner.username}</p>
            </div>
            {changeable &&
            <div className="current-playlist__options">
              <button className="current-playlist__change-button"
                      onClick={onEditButtonClick}>Изменить
              </button>
            </div>
            }
          </div>
        }

        <LimitedTracksView
          playlist={playlist}
          optionsText="Удалить"
          optionsFunction={optionsFunction}
          className="current-playlist__tracks"/>
      </div>
    </div>
  );
}

export default CurrentPlaylist;