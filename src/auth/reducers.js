import { connect } from 'react-redux';
import { constants, createAccount, setToken, logOut } from './actions';

const initialState = {
    token: null,
    role: null,
}

export const userReducer = (state = initialState, action) => {
    console.log(state, action);
    switch (action.type) {
        case constants.CREATE_ACCOUNT:
            console.log('create account reducer trigered');
            return Object.assign({}, state, {
                token: state.token,
                role: state.role
            })
        case constants.SET_TOKEN:
            console.log('set token reducer trigered');
            return Object.assign({}, state, {
                token: state.token,
                role: state.role
            })
        case constants.LOG_OUT:
            console.log('log out reducer trigered');
            return Object.assign({}, state, {
                token: null,
                role: null
            })
        default:
            return state;
    }
}

// container part
/*
function mapStateToProps(state) {
    return { ...state };
}
*/
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createAccount, setToken, logOut }, dispatch);
}

export default connect( mapDispatchToProps )(userReducer);