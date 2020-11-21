import * as types from '../constants';
import * as API from '../ulties/api';

export const status = () => {
    return {
        type: types.TOGGLE_STATUS
    }
}

export const logout = () => {
    return {
        type: types.LOGOUT
    }
}

export const successLogin = (payload) => {
    return {
        type: types.SUCCESS_LOGIN,
        payload
    }
}

export const failureLogin = (payload) => {
    return {
        type: types.FAILURE_LOGIN,
        payload
    }
}

export const successCheckToken = payload => {
    return {
        type: types.SUCCESS_CHECK_TOKEN,
        payload
    }
}

export const failureCheckToken = payload => {
    return {
        type: types.FAILURE_CHECK_TOKEN,
        payload
    }
}