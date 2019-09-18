import {combineReducers} from 'redux';
import DataReducer from './DataReducer';
import FBReducer from './FBReducer';
import AuthReducer from './AuthReducer';
import CategoryReducer from './CategoryReducer';
import Database from './Database';

export default combineReducers({
    DataReducer,
    FBReducer,
    AuthReducer,
    CategoryReducer,
    Database
})