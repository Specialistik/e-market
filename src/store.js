import { combineReducers, createStore, applyMiddleware } from "redux";
//import { reduxifyNavigator, createReactNavigationReduxMiddleware, createNavigationReducer } from "react-navigation-redux-helpers";
import thunk from "redux-thunk";

import userReducer from "./auth/reducers";
import coreReducer from "./core/reducers";

export default function configureStore(AppNavigator) {
    const navReducer = createNavigationReducer(AppNavigator);
    const rootReducer = combineReducers({
        userReducer,
        coreReducer,
        AppNavigator
        //nav: navReducer
    });
    /*
    const middleware = createReactNavigationReduxMiddleware(
        "root",
        state => state.nav
    );
    reduxifyNavigator(AppNavigator, "root");
    */
    return createStore(
        rootReducer,
        applyMiddleware(thunk, middleware)
    );
}