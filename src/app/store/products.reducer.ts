import { createReducer, on } from '@ngrx/store';
import * as ProductsActions from './products.actions';
import { Product } from '../models';

export interface ProductsState {
    products: Product[]
}

export const initialState: ProductsState = {
    products: []
};

export const productsReducer = createReducer(
    initialState,
    on(ProductsActions.loadProductsSuccess, (state, { products }) => ({ ...state, products }))
);
