import {connect} from 'react-redux'
import {authenticate, requestToken} from '../actions'
import LogInPage from "../components/LogInPage/LogInPage";

const mapStateToProps = (state) => ({
  authentication: state.getIn(['delight', 'authentication'])
})

const mapDispatchToProps = {authenticate, requestToken}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogInPage)