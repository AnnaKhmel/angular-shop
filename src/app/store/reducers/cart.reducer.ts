import { createReducer, on } from '@ngrx/store';
import { CartItem } from '../../models';
import * as CartActions from '../actions/cart.actions';

export interface CartState {
    items: CartItem[];
}

export const initialState: CartState = {
    items: []
};

export const cartReducer = createReducer(
    initialState,
    on(CartActions.addItem, (state, { cartItem }) => {
        const item = state.items.find(i => i.product.id === cartItem.product.id
            && i.product.options[0].color === cartItem.product.options[0].color
            && i.product.options[0].size === cartItem.product.options[0].size
            && i.product.options[0].gender === cartItem.product.options[0].gender);

        if (!item) {
            return {
                items: [...state.items, cartItem]
            };
        }

        const items = state.items.map(i => {
            if (i.product.id === cartItem.product.id
                && i.product.options[0].color === cartItem.product.options[0].color
                && i.product.options[0].size === cartItem.product.options[0].size
                && i.product.options[0].gender === cartItem.product.options[0].gender) {
                return {
                    quantity: i.quantity + 1,
                    product: i.product
                };
            }

            return i;
        });

        return { items };
    }),
    on(CartActions.deleteItem, (state, { cartItem }) => {
        const items = state.items
            .map(i => {
                if (i.product.id === cartItem.product.id
                    && i.product.options[0].color === cartItem.product.options[0].color
                    && i.product.options[0].size === cartItem.product.options[0].size
                    && i.product.options[0].gender === cartItem.product.options[0].gender) {
                    return {
                        quantity: i.quantity - 1,
                        product: i.product
                    };
                }

                return i;
            })
            .filter(i => i.quantity > 0);

        return { items };
    }),
    on(CartActions.deleteAll, (state, { cartItem }) => {
        const items = state.items.filter(i => !(i.product.id === cartItem.product.id
            && i.product.options[0].color === cartItem.product.options[0].color
            && i.product.options[0].size === cartItem.product.options[0].size
            && i.product.options[0].gender === cartItem.product.options[0].gender));
        
        return { items };
    })
);
