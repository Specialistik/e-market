import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import { userReducer } from './auth/reducers';
import { coreReducer } from './core/reducers';

const rootReducer = combineReducers({
    userReducer,
    coreReducer
});

export default function configureStore() {
    return createStore(
        rootReducer,
        applyMiddleware(thunk)
    )
}