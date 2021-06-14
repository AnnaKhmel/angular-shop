import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap, withLatestFrom, tap } from 'rxjs/operators';
import { CategoryService, CustomerService, ProductService } from './../services';
import * as ProductsActions from './actions/products.actions';
import * as CategoriesActions from './actions/categories.actions';
import * as FilterActions from './actions/filter.actions';
import * as CustomerActions from './actions/customer.actions';
import { AppState, selectGender } from '.';

@Injectable()
export class ShopEffects {

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      exhaustMap(({ categoryId, gender }) => this.productService.getProducts(categoryId, gender)
        .pipe(
          map(products => ProductsActions.loadProductsSuccess({ products })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.loadCategories),
      exhaustMap(({ gender }) =>
        this.categoryService.getCategories(gender).pipe(
          mergeMap(categories => [
            CategoriesActions.loadCategoriesSuccess({ categories }),
            FilterActions.setCategory({ categoryId: categories?.[0]?.id })
          ]),
          catchError(() => EMPTY)
        )
      )
    )
  );

  setCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilterActions.setCategory),
      withLatestFrom(this.store.select(selectGender)),
      mergeMap(([action, gender]) => [ProductsActions.loadProducts({ categoryId: action.categoryId, gender })]),
      catchError(() => EMPTY)
    )
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.signIn),
      exhaustMap(({ email, password }) =>
        this.customerService.signIn(email, password).pipe(
          map(result => CustomerActions.signInSuccess({ customerId: result.customerId, token: result.token })),
          catchError(({ error }) => [CustomerActions.signInError({ errorMessage: error.error.message })])
        )
      )
    )
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.signUp),
      exhaustMap(({ customer }) =>
        this.customerService.signUp(customer).pipe(
          map(result => CustomerActions.signUpSuccess({ customerId: result.customerId, token: result.token })),
          catchError(({ error }) => [CustomerActions.signUpError({ errorMessage: error.error.message })])
        )
      )
    )
  );

  authenticationSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.signInSuccess, CustomerActions.signUpSuccess),
      tap(({ customerId, token }) => {
        localStorage.setItem('app_shop_customer', JSON.stringify({ customerId, token }));
        this.router.navigateByUrl('/');
      })
    ), { dispatch: false });

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.logout),
      tap(() => {
        localStorage.removeItem('app_shop_customer');
        this.router.navigateByUrl('/');
      })
    ), { dispatch: false });

  constructor(
    private router: Router,
    private actions$: Actions,
    private store: Store<AppState>,
    private productService: ProductService,
    private categoryService: CategoryService,
    private customerService: CustomerService
  ) { }
}