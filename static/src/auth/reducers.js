import { constants, createAccount, setToken, logOut } from './actions';

const initialState = {
    token: null,
    role: null,
}

// That's raw and decomposed, 
const userReducer = (state, action) => {
    console.log(state, action);
    //console.log('constants ', constants);
    switch (action.type) {
        case constants.CREATE_ACCOUNT:
            return createAccount();
        case constants.SET_TOKEN:
            return setToken();
        case constants.LOG_OUT:
            return log_out();
        default:
            return initialState;
    }
}

export default userReducer;