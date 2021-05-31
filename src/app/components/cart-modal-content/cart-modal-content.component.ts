import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';
import { AppState, selectCartItems } from 'src/app/store';
import { addItem, deleteAll, deleteItem } from 'src/app/store/cart.actions';

@Component({
  selector: 'cart-modal',
  templateUrl: './cart-modal-content.component.html',
  styleUrls: ['./cart-modal-content.component.scss']
})
export class CartModalContent {
  items$ = this.store.select(selectCartItems);

  constructor(
    public activeModal: NgbActiveModal,
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