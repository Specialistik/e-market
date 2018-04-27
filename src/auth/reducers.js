import { constants, createAccount, setToken, logOut } from './actions';

const initialState = {
    token: null,
    role: null,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.CREATE_ACCOUNT:
            return Object.assign({}, state, {
                token: state.token,
                role: state.role
            })
        case constants.SET_TOKEN:
            return Object.assign({}, state, {
                token: state.token,
                role: state.role
            })
        case constants.LOG_OUT:
            return Object.assign({}, state, {
                token: null,
                role: null
            })
        default:
            return state;
    }
}