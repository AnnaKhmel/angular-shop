import { createReducer, on } from '@ngrx/store';
import * as ProductsListActions from './products-list.actions';
import { Product } from '../models';

export interface ProductsState {
    products: Product[]
}

export const initialState: ProductsState = {
    products: []
};

export const productsListReducer = createReducer(
    initialState,
    on(ProductsListActions.loadProductSuccess, (state, { products }) => ({ ...state, products }))
);
