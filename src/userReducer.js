import constants from './constants';
const initialState = {
    token: null,
    role: null
}
const userReducer = (state, action) => {
    console.log(state, action); //Temporarily logging all actions
    switch (action.type) {
        case constants.CREATE_ACCOUNT:
            return initialState;
        case constants.SET_TOKEN:
            return {token: action.token, role: action.role};
        default:
            return state;
    }
}


export default userReducer;