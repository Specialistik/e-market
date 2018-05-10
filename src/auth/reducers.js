import * as AuthActionCreators from './actions'
//import {  } from './actions'
//import { constants, createAccount, setToken, logOut } from './actions';

const initialState = {
    token: null,
    role: null,
}

export const userReducer = (state = initialState, action) => {
    console.log('userReducer state is ', state);
    console.log('userReducer action is ', action);
    switch (action.type) {
        case AuthActionCreators.createAccount:
            console.log('create account reducer trigered');
            return Object.assign({}, state, {
                token: state.token,
                role: state.role
            })
        case AuthActionCreators.SET_TOKEN:
            console.log('set token reducer trigered');
            return Object.assign({}, state, {
                token: state.token,
                role: state.role
            })
        case AuthActionCreators.LOG_OUT:
            console.log('log out reducer trigered');
            return Object.assign({}, state, {
                token: null,
                role: null
            })
        default:
            return state;
    }
}