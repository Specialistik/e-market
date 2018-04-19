// file: src/store.js
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';

import * as reducers from './reducers/index.jsx';

const reducer = combineReducers(reducers);
//const store = createStore(reducer);
export const store = createStore(reducer);
persistStore(store);