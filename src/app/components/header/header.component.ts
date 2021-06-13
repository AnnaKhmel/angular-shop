import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectCartItemsCount, selectCustomerIsAuthenticated } from 'src/app/store';
import { logout } from 'src/app/store/actions/customer.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartItemsCount$ = this.store.select(selectCartItemsCount);
  customerIsAuthenticated$ = this.store.select(selectCustomerIsAuthenticated);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  onLogoutClick(): void {
    this.store.dispatch(logout());
  }
}
