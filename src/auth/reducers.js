import * as AuthActionCreators from './actions'

const initialState = {
    token: null,
    role: null,
}

export default function userReducer(state = initialState, action) {
    console.log(state, action);
    switch (action.type) {
        case AuthActionCreators.constants.CREATE_ACCOUNT:
            return Object.assign({}, state, {
                token: state.token,
                role: state.role
            });
        case AuthActionCreators.constants.SET_TOKEN:
            return Object.assign({}, state, {
                token: state.token,
                role: state.role
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