import { constants } from './actions';

const initialState = {
    token: null,
    role: null,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case constants.CREATE_ACCOUNT:
            return Object.assign({}, state, {
                token: action['token'],
                role: action['role']
            });
        case constants.SET_TOKEN:
            return Object.assign({}, state, {
                token: action['token'],
                role: action['role']
            });
        case constants.LOG_OUT:
            return Object.assign({}, state, {
                token: null,
                role: null
            });
        default:
            return state;
    }
}