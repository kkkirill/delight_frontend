import {connect} from 'react-redux';
import {uploadSong} from '../actions';
import SongUploadInput from '../components/SongUploadInput/SongUploadInput';

const mapStateToProps = state => ({
  songUploadInfo: state.getIn(['delight', 'songUploadInfo'])
});

const mapDispatchToProps = {
  uploadSong
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongUploadInput);