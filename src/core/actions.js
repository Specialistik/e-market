export const constants =  {
    SELECT_CATEGORIES: "SELECT_CATEGORIES",
    SELECT_PRODUCTS: "SELECT PRODUCTS",
};

export function selectCategories(pid) {
    return {
        type: constants.SELECT_CATEGORIES,
        categories: Array
    };
}

export function selectProducts(pid) {
    return {
        type: constants.SELECT_PRODUCTS,
        products: Array, category: Array
    };
}
