import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectProducts } from 'src/app/store';
import { loadProducts } from 'src/app/store/products-list.actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$ = this.store.select(selectProducts);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }
}
