import {connect} from 'react-redux';
import {submitTrack, getArtists, getGenres} from '../actions';
import UploadTrackPage from '../components/UploadTrackPage/UploadTrackPage';

const mapStateToProps = state => ({
  imageUploadInfo: state.getIn(['delight', 'imageUploadInfo']),
  songUploadInfo: state.getIn(['delight', 'songUploadInfo']),
  artists: state.getIn(['delight', 'artists']),
  genres: state.getIn(['delight', 'genres'])
});

const mapDispatchToProps = {
  submitTrack,
  getArtists,
  getGenres
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadTrackPage);