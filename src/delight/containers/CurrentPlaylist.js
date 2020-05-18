import {connect} from 'react-redux';
import CurrentPlaylist from '../components/CurrentPlaylist/CurrentPlaylist';
import {setPlaylistVisibility, getPlaylist, updatePlaylistInfo, removeTrackFromPlaylist, dislikeTrack} from '../actions';

const mapStateToProps = state => {
  const showingPlaylist = state.getIn(['delight', 'currentShowingTracksList']);

  return {
    isPlaylistVisible: state.getIn(['delight', 'isPlaylistVisible']),
    playlist: showingPlaylist.id ? showingPlaylist : state.getIn(['delight', 'currentTracksList']),
    authentication: state.getIn(['delight', 'authentication']),
    imageUploadInfo: state.getIn(['delight', 'imageUploadInfo'])
  };
};

const mapDispatchToProps = {
  setPlaylistVisibility,
  getPlaylist,
  updatePlaylistInfo,
  removeTrackFromPlaylist,
  dislikeTrack
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentPlaylist);