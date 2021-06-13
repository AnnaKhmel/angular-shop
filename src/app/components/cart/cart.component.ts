import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartItem } from 'src/app/models/cart-item';
import { AppState, selectCartItems, selectCartItemsTotal } from 'src/app/store';
import { addItem, deleteAll, deleteItem } from 'src/app/store/actions/cart.actions';

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  items$ = this.store.select(selectCartItems);
  selectCartItemsTotal$ = this.store.select(selectCartItemsTotal);

  constructor(
    private store: Store<AppState>
  ) {}

  onDecreaseClicked(cartItem: CartItem) {
    this.store.dispatch(deleteItem({ cartItem }));
  }

  onIncreaseClicked(cartItem: CartItem) {
    this.store.dispatch(addItem({ cartItem }));
  }

  onDeleteAllClicked(cartItem: CartItem) {
    this.store.dispatch(deleteAll({ cartItem }));
  }
}
