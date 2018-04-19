// file: src/actions/index.js
import * as actionType from './types.jsx';

export const setToken = (data) => {
  return {
    type: actionType.SET_TOKEN,
    data
  }
};