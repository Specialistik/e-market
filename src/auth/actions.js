export const constants =  {
    CREATE_ACCOUNT: 'CREATE ACCOUNT',
    SET_TOKEN: 'SET TOKEN',
    LOG_OUT: 'LOG OUT',
};

// They don't get exported as expected for some reason
export const ROLES = {
    CUSTOMER: 'customer',
    PRODUCER: 'producer',
    MANAGER: 'manager',
    SUPERVISOR: 'supervisor',
}

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
 * @param {string} username
 * @param {string} password
 */
export function setToken(username, password) {
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
