import {connect} from 'react-redux';
import {addPost, getPlaylists, getPlaylist} from '../actions';
import AddPostPage from '../components/AddPostPage/AddPostPage';

const mapStateToProps = state => ({
  authentication: state.getIn(['delight', 'authentication']),
  playlists: state.getIn(['delight', 'playlists']),
  imageUploadInfo: state.getIn(['delight', 'imageUploadInfo']),
  currentPlaylist: state.getIn(['delight', 'currentShowingTracksList'])
});

const mapDispatchToProps = {
  addPost,
  getPlaylists,
  getPlaylist
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPostPage);