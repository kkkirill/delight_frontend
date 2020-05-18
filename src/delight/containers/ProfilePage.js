import {connect} from 'react-redux';
import ProfilePage from '../components/ProfilePage/ProfilePage';
import {
  requestUser,
  followUser,
  stopFollowingUser,
  getPosts,
  getPlaylists,
  setPlaylistVisibility,
  createPlaylist
} from '../actions';

const mapStateToProps = state => ({
  authentication: state.getIn(['delight', 'authentication']),
  user: state.getIn(['delight', 'loadedUser']),
  playlists: state.getIn(['delight', 'playlists']),
  posts: state.getIn(['delight', 'posts']),
  playlistVisibility: state.getIn(['delight', 'isPlaylistVisible'])
});

const mapDispatchToProps = {
  requestUser,
  followUser,
  stopFollowingUser,
  getUserPostsConsecutive: getPosts,
  setPlaylistVisibility,
  createPlaylist,
  getUserPlaylists: getPlaylists
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);