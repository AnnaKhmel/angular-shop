import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { AppState } from 'src/app/store';
import { Product } from 'src/app/models/product';
import { loadProducts } from 'src/app/store/products-list.actions';
import { addItem } from 'src/app/store/cart.actions';
import { CartItem } from 'src/app/models/cart-item';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]> = this.store.select(({ productsList }) => productsList.products);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }

  onAddToCartClicked(product: Product) {
    const cartItem: CartItem = {
      product,
      quantity: 1
    };
    
    this.store.dispatch(addItem({ cartItem }));
  }
}
