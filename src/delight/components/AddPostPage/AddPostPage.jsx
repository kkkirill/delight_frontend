import React, {useCallback, useEffect, useState} from 'react';
import classnames from 'classnames';
import TextareaAutosize from 'react-textarea-autosize';
import {Redirect} from 'react-router-dom';

import './AddPostPage.css';
import HorizontalScroll from '../HorizontalScroll/HorizontalScroll';
import Track from '../../containers/Track';
import PlaylistOverview from '../../containers/PlaylistOverview';
import NavigationPanel from '../../containers/NavigationPanel';
import ImageUploadInput from '../../containers/ImageUploadInput';
import {requestFavorites} from '../../actions';

function AddPostPage({className, currentPlaylist, authentication, playlists, imageUploadInfo, getPlaylists, getPlaylist, addPost}) {
  const [submitted, setSubmitted] = useState(false);

  if (authentication.get('status') !== 1) {
    return <Redirect to="not-found"/>;
  }

  useEffect(() => {
    getPlaylists(authentication.get('data').token, authentication.get('data').id);
  }, [authentication.get('data')]);

  useEffect(() => {
    if (playlists.results && playlists.results[0]) {
      getPlaylist(authentication.getIn(['data', 'id']), playlists.results[0].id);
    }
  }, [playlists.results && playlists.results[0].id])

  const [text, setText] = useState('');
  let [checkedTracks, setCheckedTracks] = useState([]);
  let [checkedPlaylists, setCheckedPlaylists] = useState([]);

  const visiblePlaylists = playlists.results.slice(2, 10000);
  const tracks = currentPlaylist && currentPlaylist.songs || [];

  const onTextChange = ({target: {value}}) => {
    setText(value);
  };

  const onTrackCheckChange = useCallback(({target}) => {
    const checked = target.checked;
    const key = target.getAttribute('data-key');

    if (checked) {
      setCheckedTracks(checkedTracks.concat(key));
    } else {
      checkedTracks.splice(checkedTracks.indexOf(key), 1);
      setCheckedTracks(checkedTracks);
    }
  }, [checkedTracks]);

  const onPlaylistCheckChange = useCallback(({target}) => {
    const checked = target.checked;
    const key = target.getAttribute('data-key');

    if (checked) {
      setCheckedPlaylists(checkedPlaylists.concat(key));
    } else {
      checkedPlaylists.splice(checkedPlaylists.indexOf(key), 1);
      setCheckedPlaylists(checkedPlaylists);
    }
  }, [checkedPlaylists]);

  if (submitted) {
    return <Redirect to="/" />
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    const data = {
        owner: authentication.get('data').id,
        text,
        images: [imageUploadInfo.getIn(['data', 'file'])],
        songs: checkedTracks.map(id => tracks[id].id),
        playlists: checkedPlaylists.map(id => visiblePlaylists[id].id),
        albums: []
      }

    addPost(
      authentication.get('data').token,
      authentication.get('data').id,
      data);

    setSubmitted(true);
  };

  const tracksMap = tracks.map((track, index) => (
    <Track playlist={currentPlaylist} index={index} key={track.id}>
      <input type="checkbox" value={checkedTracks.includes(track.id)} data-key={index}
             onChange={onTrackCheckChange}/>
    </Track>
  ));

  const playlistsMap = visiblePlaylists.map((playlist, index) => (
    <div key={playlist.id}>
      <PlaylistOverview
        className="limited-playlists-view__playlist"
        playlist={playlist}
      >
        <input type="checkbox" value={checkedPlaylists.includes(playlist.id)} data-key={index}
               onChange={onPlaylistCheckChange}/>
      </PlaylistOverview>
    </div>
  ));

  return (
    <div className={classnames('add-post-page', className)}>
      <NavigationPanel/>

      <form className='add-post-page__form' onSubmit={onFormSubmit}>

        <h3 className={'add-post-page__title'}>Добавить пост</h3>
        <TextareaAutosize
          className="add-post-page__text-input"
          placeholder="Текст для поста"
          value={text}
          onChange={onTextChange}
          maxRows={6}
        />

        <ImageUploadInput imageType="PI"/>

        {tracks.length ?
          <>
            <p className="add-post-page__tracks-title">Выберите треки для добавления</p>
            <div className="add-post-page__tracks-container">
              {tracksMap}
            </div>
          </>
          :
          <></>
        }

        {visiblePlaylists.length ?
          <>
            <p className="add-post-page__playlists-title">Выберите плейлисты для добавления</p>
            <HorizontalScroll>
              {playlistsMap}
            </HorizontalScroll>
          </> :
          <></>
        }

        <input className="add-post-page__submit" type="submit"/>
      </form>
    </div>
  );
}

export default AddPostPage;