import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';
import { AppState, selectCartItems } from 'src/app/store';
import { addItem, deleteAll, deleteItem } from 'src/app/store/actions/cart.actions';

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  items$ = this.store.select(selectCartItems);

  constructor(
    private store: Store<AppState>
  ) {}

  onDecreaseClicked(product: Product) {
    this.store.dispatch(deleteItem({ productId: product.id }));
  }

  onIncreaseClicked(product: Product) {
    const cartItem: CartItem = {
      product,
      quantity: 1
    };
    
    this.store.dispatch(addItem({ cartItem }));
  }

  onDeleteAllClicked(product: Product) {
    this.store.dispatch(deleteAll({ productId: product.id }));
  }
}
