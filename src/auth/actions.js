export const constants =  {
    CREATE_ACCOUNT: 'CREATE ACCOUNT',
    SET_TOKEN: 'SET TOKEN',
    LOG_OUT: 'LOG OUT',
};

/**
 * @param {string} email 
 * @param {string} password
 * @param {number} inn 
 * @param {string} phone 
 * @param {string} role
 * @param {string} company_name  
 */
export function createAccount(email, password, inn, phone, role, company_name) {
    return {
        type: constants.CREATE_ACCOUNT,
        token: string,
        role: string
    };
}

/**
 * @param {string} role
 * @param {string} token
 */
export function setToken(role, token) {
    return {
        type: constants.SET_TOKEN,
        token: string,
        role: string
    };
}

export function logOut() {
    return {
        type: constants.LOG_OUT,
        role: null,
        token: null
    };
}
