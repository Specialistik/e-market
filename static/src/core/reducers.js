import { selectCategories, selectProducts, constants } from './actions';

const initialState = {
    categories: [],
    products: [],
}

export const coreReducer = (state, action) => {
    console.log(state, action);
    //console.log('constants ', constants);
    switch (action.type) {
        case constants.SELECT_CATEGORIES:
            return selectCategories; //initialState;
        case constants.SELECT_PRODUCTS:
            return selectProducts;
        default:
            return initialState;
    }
}
