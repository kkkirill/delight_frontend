import {connect} from 'react-redux'
import {setPlaying, setCurrentPlayingTime, setCurrentTrack, setCurrentPlaylist,
  likeTrack} from '../actions'
import Track from "../components/Track/Track";

const mapStateToProps = state => ({
    currentTrack: state.getIn(['delight', 'currentTrack']),
    currentPlaylist: state.getIn(['delight', 'currentTracksList']),
    playing: state.getIn(['delight', 'playing']),
    authentication: state.getIn(['delight', 'authentication']),
    favorites: state.getIn(['delight', 'favorites'])
})

const mapDispatchToProps = {setPlaying, setCurrentPlayingTime, setCurrentTrack, setCurrentPlaylist, likeTrack}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Track)