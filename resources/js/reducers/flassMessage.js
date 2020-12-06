import * as types from '../constants';


let initial_state = {
    duration: 5000,
    status: 'success',
    content: null
}

const myReducer = (state = initial_state, action) => {
    let new_state = {...initial_state}
    switch(action.type) {
        case types.SET_FLASS_MESSAGE:
            new_state.content = action.payload.content;
            new_state.status = action.payload.status || 'success';
            new_state.duration = action.payload.duration || 5000;
            return new_state;
        case types.FREE_FLASH_MESSAGE:
            new_state = initial_state;
            return new_state;

        default:
            return state;
    }
}

export default myReducer;