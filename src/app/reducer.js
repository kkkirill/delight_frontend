import {combineReducers} from 'redux-immutable';
import delightReducer from '../delight/reducers'

export default combineReducers({
    delight: delightReducer,
});