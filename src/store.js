import { createStore } from 'redux';
import userReducer from './userReducer';

const userStore = createStore(userReducer);
export default userStore;