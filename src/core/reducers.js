import * as coreActions from './actions';

const initialState = {
    categories: [],
    products: [],
}

export default function coreReducer(state = initialState, action) {
    switch (action.type) {
        case coreActions.constants.SELECT_CATEGORIES:
            return Object.assign({}, state, { categories: state.categories });
        case coreActions.constants.SELECT_PRODUCTS:
            return Object.assign({}, state, {
                products: state.products,
                category: state.category
            });
        default:
            return state;
    }
}
