export const constants =  {
    SELECT_CATEGORIES: 'SELECT_CATEGORIES',
    SELECT_PRODUCTS: 'SELECT PRODUCTS',
};
/*
export const coreActionCreators = {
    selectCategories(pid) {
        return {
            type: SELECT_CATEGORIES,
            categories: Array
        }
    },

    selectProducts(pid) {
        return {
            type: SELECT_PRODUCTS,
            products: Array, category: Array
        }
    }
};
*/
export function selectCategories(pid) {
    return {
        type: constants.SELECT_CATEGORIES,
        categories: Array
    };
}

export function selectProducts(pid) {
    return {
        type: SELECT_PRODUCTS,
            products: Array, category: Array
    };
}
