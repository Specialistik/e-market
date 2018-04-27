import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import userReducer from './auth/reducers';
import coreReducer from './core/reducers';

const rootReducer = combineReducers({
    userReducer,
    coreReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    )
}