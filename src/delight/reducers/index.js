import {handleActions} from 'redux-actions';
import Immutable from 'immutable';

import {
  setPlaying,
  setCurrentPlayingTime,
  setCurrentTrack,
  setPlaylistVisibility,
  setCurrentPlaylist,
  setCurrentShowingPlaylist,
  requestedUser,
  receiveUser,
  errorUser,
  requestToken,
  receiveToken,
  errorToken,
  errorRegistration,
  requestPosts,
  receivePosts,
  incrUpdateCounter,
  updateUser,
  requestAddPost,
  receiveAddPost,
  errorAddPost,
  receivePlaylists,
  requestImageUpload,
  receiveImageUpload,
  errorImageUpload,
  requestSongUpload,
  receiveSongUpload,
  errorSongUpload,
  setCurrentArtistsList,
  setCurrentGenresList, updateFavorites, setCurrentTrackInfo
} from '../actions';

const main = handleActions(
  {
    [setPlaying]: (state, {payload}) => state.set('playing', payload),
    [setCurrentPlayingTime]: (state, {payload}) => state.set('currentPlayingTime', parseInt(payload)),
    [setCurrentTrack]: (state, {payload}) => state.set('currentTrack', payload),
    [setPlaylistVisibility]: (state, {payload}) => state.set('isPlaylistVisible', payload),
    [setCurrentPlaylist]: (state, {payload}) => state.set('currentTracksList', payload),
    [setCurrentShowingPlaylist]: (state, {payload}) => state.set('currentShowingTracksList', payload),
    [setCurrentArtistsList]: (state, {payload}) => state.set('artists', payload),
    [setCurrentGenresList]: (state, {payload}) => state.set('genres', payload),
    [requestedUser]: (state) => state.set('loadedUser', {}),
    [receiveUser]: (state, {payload}) => state.set('loadedUser', payload),
    [errorUser]: (state) => state.set('loadedUser', null),
    [errorRegistration]: (state, {payload}) => state.setIn(['authentication', 'status'], 2).setIn(['authentication', 'data'], payload),
    [requestToken]: (state) => state.setIn(['authentication', 'status'], 0),
    [receiveToken]: (state, {payload}) => state.setIn(['authentication', 'status'], 1).setIn(['authentication', 'data'], payload),
    [errorToken]: (state) => state.setIn(['authentication', 'status'], 2),
    [receivePosts]: (state, {payload}) => state.set('posts', payload),
    [incrUpdateCounter]: (state) => state.set('updateCounter', state.get('updateCounter') + 1),
    [updateUser]: (state, {payload}) => state.setIn(['authentication', 'user'], payload),
    [requestAddPost]: (state) => state.set('addPostStatus', 0),
    [receiveAddPost]: (state) => state.set('addPostStatus', 1),
    [errorAddPost]: (state) => state.set('addPostStatus', 2),
    [receivePlaylists]: (state, {payload}) => state.set('playlists', payload),
    [requestImageUpload]: (state) => state.setIn(['imageUploadInfo', 'status'], 0),
    [receiveImageUpload]: (state, {payload}) => state.setIn(['imageUploadInfo', 'status'], 1).setIn(['imageUploadInfo', 'data'], payload),
    [errorImageUpload]: (state) => state.setIn(['imageUploadInfo', 'status'], 2),
    [requestSongUpload]: (state) => state.setIn(['songUploadInfo', 'status'], 0),
    [receiveSongUpload]: (state, {payload}) => state.setIn(['songUploadInfo', 'status'], 1).setIn(['songUploadInfo', 'data'], payload),
    [errorSongUpload]: (state) => state.setIn(['songUploadInfo', 'status'], 2),
    [updateFavorites]: (state, {payload}) => state.set('favorites', payload),
    [setCurrentTrackInfo]: (state, {payload}) => state.set('currentTrackInfo', payload)
  },
  Immutable.Map({
    posts: {results: []},
    currentTrackInfo: {},
    playlists: [],
    artists: [],
    genres: [],
    favorites: [],
    addPostStatus: 0,
    updateCounter: 0,
    currentTrack: 0,
    currentTracksList: {},
    currentShowingTracksList: {},
    playing: false,
    currentPlayingTime: 0,
    isPlaylistVisible: false,
    imageUploadInfo: Immutable.Map({
      data: {},
      status: 0
    }),
    songUploadInfo: Immutable.Map({
      data: {},
      status: 0
    }),
    authentication: Immutable.Map({
      data: {},
      status: 0
    }),
    loadedUser: {}
  })
);

export default main;