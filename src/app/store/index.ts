import { ActionReducerMap, createSelector } from '@ngrx/store';
import { cartReducer, CartState } from './cart.reducer';
import { ProductsState, productsListReducer } from './products-list.reducer';

export interface AppState {
    products: ProductsState,
    cart: CartState
};

export const reducers: ActionReducerMap<AppState, any> = {
    products: productsListReducer,
    cart: cartReducer
};

export const selectCartItems = (state: AppState) => state.cart.items;
export const selectProducts = (state: AppState) => state.products.products;
