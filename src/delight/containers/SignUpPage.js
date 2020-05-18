import {connect} from 'react-redux'
import {authenticate, register} from '../actions'
import SignUpPage from "../components/SignUpPage/SignUpPage";

const mapStateToProps = (state) => ({
  authentication: state.getIn(['delight', 'authentication'])
})

const mapDispatchToProps = {authenticate, register}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpPage)