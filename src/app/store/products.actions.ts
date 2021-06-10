import { createAction, props } from '@ngrx/store';
import { Product } from '../models';

export const loadProducts = createAction('[Products] Load');
export const loadProductsSuccess = createAction('[Products] Load success', props<{ products: Product[] }>());
