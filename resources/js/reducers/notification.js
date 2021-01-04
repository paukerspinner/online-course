import * as types from '../constants';

let initial_state = {
    new: null
}

const myReducer = (state = initial_state, action) => {
    let new_state = {...state}
    switch (action.type) {
        case types.SET_NEW_NOTIFICATIONS:
            new_state.new = action.payload.new_notifications;
            return new_state;

        default:
            return state;
    }
}

export default myReducer;