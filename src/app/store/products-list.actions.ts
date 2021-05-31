import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product';

export const loadProducts = createAction('[Products] Load products');
export const loadProductSuccess = createAction('[Products] Load success', props<{ products: Product[] }>());
