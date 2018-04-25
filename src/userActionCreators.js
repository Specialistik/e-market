import constants from './constants';
const userActionCreators = {
    /**
     * @param {number} user to whithdraw
     */
    setToken(username, password) {
        return {
            type: constants.SET_TOKEN,
            token: string
        };
    },

    /**
     * @param {number} amount to whithdraw
     */
    createAccount(email, password, inn, phone, role, company_name) {
        return {
            type: constants.CREATE_ACCOUNT,
            token: string
        };
    }
};
export default userActionCreators;