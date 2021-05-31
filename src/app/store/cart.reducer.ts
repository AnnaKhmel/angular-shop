import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { CartItem } from '../models/cart-item';

export interface CartState {
    items: CartItem[]
}

export const initialState: CartState = {
    items: []
};

export const cartReducer = createReducer(
    initialState,
    on(CartActions.addItem, (state, { cartItem }) => {
        const item = state.items.find(i => i.product.id === cartItem.product.id);

        if (!item) {
            return {
                items: [...state.items, cartItem]
            };
        }

        const items = state.items.map(i => {
            if (i.product.id !== cartItem.product.id) {
                return i;
            }

            const quantity = item.quantity < item.product.available
                ? item.quantity + 1
                : item.quantity;

            return {
                quantity,
                product: i.product
            };
        });

        return { items };
    }),
    on(CartActions.deleteItem, (state, { productId }) => {
        let newCartItems: CartItem[] = state.items;
        const item = state.items.find(i => i.product.id === productId);

        if (item) {
            const newQuantity = item.quantity - 1;

            if (newQuantity) {
                newCartItems = state.items.map(i => {
                    if (i.product.id !== productId) {
                        return i;
                    }
       
                    return {
                        quantity: newQuantity,
                        product: i.product
                    };
                });
            }
            else {
                newCartItems = state.items.filter(i => i.product.id !== productId);
            }
        }

        return { items: newCartItems };
    }),
    on(CartActions.deleteAll, (state, { productId }) => ({ items: state.items.filter(i => i.product.id !== productId) }))
);
