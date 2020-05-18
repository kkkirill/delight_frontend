import {connect} from 'react-redux'
import {setCurrentTrack, setCurrentShowingPlaylist, setPlaylistVisibility} from '../actions'
import LimitedTracksView from "../components/LimitedTracksView/LimitedTracksView";

const mapStateToProps = () => ({})

const mapDispatchToProps = {setCurrentShowingPlaylist, setPlaylistVisibility}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LimitedTracksView)