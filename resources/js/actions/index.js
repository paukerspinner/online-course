import * as types from '../constants';
import * as API from '../ulties/api';

export const resetAllState = () => {
    return {
        type: types.RESET_ALL_STATE
    }
}

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

export const setFlassMessage = (content, status, duration) => {
    return {
        type: types.SET_FLASS_MESSAGE,
        payload: { content, status, duration }
    }
}

export const freeFlashMessage = () => {
    return {
        type: types.FREE_FLASH_MESSAGE
    }
}

export const setNewNotifications = new_notifications => {
    return {
        type: types.SET_NEW_NOTIFICATIONS,
        payload: {
            new_notifications
        }
    }
}