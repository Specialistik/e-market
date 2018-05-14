import * as AuthActionCreators from './actions'

const initialState = {
    token: null,
    role: null,
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case AuthActionCreators.constants.CREATE_ACCOUNT:
            return Object.assign({}, state, {
                token: action['token'],
                role: action['role']
            });
        case AuthActionCreators.constants.SET_TOKEN:
            console.log('set token reducer triggered, action: ', action, 'state: ', action['token']);
            return Object.assign({}, state, {
                token: action['token'],
                role: action['role']
            });
        case AuthActionCreators.constants.LOG_OUT:
            return Object.assign({}, state, {
                token: null,
                role: null
            });
        default:
            return state;
    }
}