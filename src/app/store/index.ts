import { ActionReducerMap, createSelector } from '@ngrx/store';
import { cartReducer, CartState } from './cart.reducer';
import { ProductsState, productsReducer } from './products.reducer';
import { CategoriesState, categoriesReducer } from './categories.reducer';
import { filterReducer, FilterState } from './filter.reducer';

export interface AppState {
    products: ProductsState;
    cart: CartState;
    categories: CategoriesState;
    filter: FilterState;
};

export const reducers: ActionReducerMap<AppState, any> = {
    products: productsReducer,
    cart: cartReducer,
    categories: categoriesReducer,
    filter: filterReducer
};

export const selectCartItems = (state: AppState) => state.cart.items;
export const selectProducts = (state: AppState) => state.products.products;
export const selectCategories = (state: AppState) => state.categories.categories;

export const selectGender = (state: AppState) => state.filter.gender;
export const selectCategory = (state: AppState) => state.filter.categoryId;
