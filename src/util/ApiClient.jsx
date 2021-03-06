// file: src/util/ApiClient.js
import axios from 'axios';

export const apiClient = function() {
    const params = {
        baseURL: URL,
        headers: {'Authorization': 'Token ' + token}
    };
    return axios.create(params);
};