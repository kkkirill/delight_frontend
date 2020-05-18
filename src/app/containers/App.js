import {connect} from 'react-redux'
import {loadAuthenticationData, autoIncreasingUpdateCounter} from '../../delight/actions'
import App from "../components/App/App";

const mapStateToProps = () => ({})

const mapDispatchToProps = {loadAuthenticationData, autoIncreasingUpdateCounter}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)