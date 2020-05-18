import {connect} from 'react-redux';
import {
  setPlaying,
  setCurrentPlayingTime,
  setCurrentTrack,
  setPlaylistVisibility,
  setCurrentShowingPlaylist,
  loadTrackInfo,
  likeTrack,
  addTrackToPlaylist
} from '../actions';
import MainPlayer from '../components/MainPlayer/MainPlayer';

const mapStateToProps = state => ({
  playing: state.getIn(['delight', 'playing']),
  playlist: state.getIn(['delight', 'currentTracksList']),
  trackIndex: state.getIn(['delight', 'currentTrack']),
  tracksListVisibility: state.getIn(['delight', 'isPlaylistVisible']),
  currentTime: state.getIn(['delight', 'currentPlayingTime']),
  playlists: state.getIn(['delight', 'playlists']),
  fullTrackInfo: state.getIn(['delight', 'currentTrackInfo']),
  authentication: state.getIn(['delight', 'authentication'])
});

const mapDispatchToProps = {
  setPlaying,
  setCurrentPlayingTime,
  setCurrentShowingPlaylist,
  setCurrentTrack,
  setPlaylistVisibility,
  loadTrackInfo,
  likeTrack,
  addTrackToPlaylist
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPlayer);