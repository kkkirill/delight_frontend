import {connect} from 'react-redux'
import {setCurrentTrack, setCurrentShowingPlaylist, setPlaylistVisibility} from '../actions'
import PlaylistOverview from "../components/PlaylistOverview/PlaylistOverview";

const mapStateToProps = () => ({})

const mapDispatchToProps = {setCurrentTrack, setCurrentShowingPlaylist, setPlaylistVisibility}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaylistOverview)