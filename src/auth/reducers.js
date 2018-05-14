import * as AuthActionCreators from './actions'

const initialState = {
    token: null,
    role: null,
}

export default function userReducer(state = initialState, action) {
    console.log(state, action);
    //console.log('action creators ', AuthActionCreators);
    //console.log(AuthActionCreators.constants.CREATE_ACCOUNT, AuthActionCreators.constants.SET_TOKEN, )
    switch (action.type) {
        case AuthActionCreators.constants.CREATE_ACCOUNT:
            console.log('create account action reducer ');
            return Object.assign({}, state, {
                token: state.token,
                role: state.role
            });
        case AuthActionCreators.constants.SET_TOKEN:
            console.log('set token action reducer ');
            return Object.assign({}, state, {
                token: state.token,
                role: state.role
            });
        case AuthActionCreators.constants.LOG_OUT:
            console.log('logout action reducer ');
            return Object.assign({}, state, {
                token: null,
                role: null
            });
        default:
            return state;
    }
}