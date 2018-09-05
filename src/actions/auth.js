export const constants =  {
    CREATE_ACCOUNT: "CREATE ACCOUNT",
    SET_TOKEN: "SET TOKEN",
    LOG_OUT: "LOG OUT",
};

/**
 * @param {string} email 
 * @param {string} password
 * @param {number} inn 
 * @param {string} phone 
 * @param {string} role
 * @param {string} company_name  
 */


export function createAccount(token, role) {
    return {
        type: constants.CREATE_ACCOUNT,
        token: token,
        role: role
    };
}


/**
 * @param {string} token
 * @param {string} role
 */
export function setToken(token, role) {
    return {
        type: constants.SET_TOKEN,
        token: token,
        role: role
    };
}

export function logOut() {
    return {
        type: constants.LOG_OUT
    };
}
