import auth from './auth';
import flassMessage from './flassMessage';
import notification from './notification'
import * as actions from '../actions';
import * as types from '../constants';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
    auth,
    flassMessage,
    notification
})


const rootReducer = (state, action) => {
    if (action.type == types.RESET_ALL_STATE) {
        return {
            auth: {
                is_logged: false,
                user: null,
                access_token: null
            },
            flassMessage: {
                duration: 5000,
                status: 'success',
                content: null
            },
            notification: {
                new: null
            }
        };
    }
    
    return appReducer(state, action);
}

export default rootReducer;