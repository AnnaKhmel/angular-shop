import { ActionReducerMap, createSelector } from '@ngrx/store';
import { cartReducer, CartState } from './reducers/cart.reducer';
import { ProductsState, productsReducer } from './reducers/products.reducer';
import { CategoriesState, categoriesReducer } from './reducers/categories.reducer';
import { filterReducer, FilterState } from './reducers/filter.reducer';
import { customerReducer, CustomerState } from './reducers/customer.reducer';

export interface AppState {
    products: ProductsState;
    cart: CartState;
    categories: CategoriesState;
    filter: FilterState;
    customer: CustomerState;
};

export const reducers: ActionReducerMap<AppState, any> = {
    products: productsReducer,
    cart: cartReducer,
    categories: categoriesReducer,
    filter: filterReducer,
    customer: customerReducer
};

export const selectProducts = (state: AppState) => state.products.products;
export const selectCategories = (state: AppState) => state.categories.categories;

export const selectCart = (state: AppState) => state.cart;

export const selectCartItems = createSelector(
    selectCart,
    state => state.items
);
export const selectCartItemsCount = createSelector(
    selectCartItems,
    items => items.reduce((acc, { quantity }) => acc + quantity, 0)
);
export const selectCartItemsTotal = createSelector(
    selectCartItems,
    items => items.reduce((acc, item) => acc + (item.quantity * item.product.price), 0)
);

export const selectFilter = (state: AppState) => state.filter;

export const selectGender = createSelector(
    selectFilter,
    state => state.gender
);
export const selectCategory = createSelector(
    selectFilter,
    state => state.categoryId
);


export const selectCustomer = (state: AppState) => state.customer;

export const selectCustomerId = createSelector(
    selectCustomer,
    ({ customerId }) => customerId
);
export const selectCustomerIsAuthenticated = createSelector(
    selectCustomer,
    state => state.isAuthenticated
);
export const selectCustomerToken = createSelector(
    selectCustomer,
    ({ token }) => token
);
