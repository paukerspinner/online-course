import * as types from '../constants';

let initial_state = {
    is_logged: localStorage.getItem('access_token') && true,
    user: null,
    access_token: localStorage.getItem('access_token') || null
}

const myReducer = (state = initial_state, action) => {
    let new_state = {...state}
    switch (action.type) {
        case types.LOGOUT:
            localStorage.removeItem('access_token');
            return {
                is_logged: false,
                user: {}
            }

        case types.SUCCESS_LOGIN:
            new_state.access_token = action.payload.access_token;
            new_state.user = action.payload.user;
            new_state.is_logged = true;
            localStorage.setItem('access_token', action.payload.access_token);
            return new_state;

        case types.FAILURE_LOGIN:
            console.log(action.payload)
            return new_state;
        
        case types.SUCCESS_CHECK_TOKEN:
            new_state.is_logged = true;
            new_state.user = action.payload
            return new_state;

        case types.FAILURE_CHECK_TOKEN:
            localStorage.removeItem('access_token');
            return {
                is_logged: false,
            }

        default:
            return state;
    }
}

export default myReducer;