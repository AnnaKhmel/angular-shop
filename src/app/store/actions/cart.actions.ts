import { createAction, props } from '@ngrx/store';
import { CartItem } from '../../models';

export const addItem = createAction('[Cart] Add item', props<{ cartItem: CartItem }>());
export const deleteItem = createAction('[Cart] Delete item', props<{ cartItem: CartItem }>());
export const deleteAll = createAction('[Cart] Delete all', props<{ cartItem: CartItem }>());
