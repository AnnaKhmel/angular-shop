import { createAction, props } from '@ngrx/store';
import { Gender, Product } from '../../models';

export const loadProducts = createAction('[Products] Load', props<{ categoryId: number, gender: Gender }>());
export const loadProductsSuccess = createAction('[Products] Load success', props<{ products: Product[] }>());
