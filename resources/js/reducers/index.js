import auth from './auth';
import flassMessage from './flassMessage';
import { combineReducers } from 'redux';

const myReducer = combineReducers({
    auth,
    flassMessage
})

export default myReducer;