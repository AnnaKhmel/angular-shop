import { ActionReducerMap, createSelector } from '@ngrx/store';
import { cartReducer, CartState } from './cart.reducer';
import { ProductsState, productsListReducer } from './products-list.reducer';

export interface AppState {
    productsList: ProductsState,
    cart: CartState
};

export const reducers: ActionReducerMap<AppState, any> = {
    productsList: productsListReducer,
    cart: cartReducer
};

export const selectCartItems = (state: AppState) => state.cart.items;
