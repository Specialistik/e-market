import { selectCategories, selectProducts, constants } from './actions';

const initialState = {
    categories: [],
    products: [],
}

export const coreReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.SELECT_CATEGORIES:
            return Object.assign({}, state, { categories: state.categories });
        case constants.SELECT_PRODUCTS:
            return Object.assign({}, state, {
                products: state.products,
                category: state.category
            });
        default:
            return state;
    }
}
