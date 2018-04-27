import { constants, createAccount, setToken, logOut } from './actions';

const initialState = {
    token: null,
    role: null,
}

// That's raw and decomposed, 
export const userReducer = (state = initialState, action) => {
    console.log('user reducer being interpreted', state, action, action.type);
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

//export default userReducer;