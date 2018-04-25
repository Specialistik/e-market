export default {
    CREATE_ACCOUNT: 'CREATE ACCOUNT',
    SET_TOKEN: 'SET TOKEN',
    LOG_OUT: 'LOG_OUT',
};

const userActionCreators = {
    /**
     * @param {string} username
     * @param {string} password
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