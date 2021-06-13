import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectCartItems, selectCartItemsTotal } from 'src/app/store';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  items$ = this.store.select(selectCartItems);
  selectCartItemsTotal$ = this.store.select(selectCartItemsTotal);
  
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }
}
