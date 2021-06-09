import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { ProductService } from './../services';
import * as ProductsListActions from './products-list.actions';

@Injectable()
export class ShopEffects {

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsListActions.loadProducts),
      mergeMap(() => this.productService.getProducts()
        .pipe(
          map(products => ProductsListActions.loadProductsSuccess({ products })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  // loadProductOptions$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ProductOptionsActions.loadProductOptions),
  //     exhaustMap(action =>
  //       this.productService.getProductOptions(action.productId).pipe(
  //         map(options => ProductOptionsActions.loadProductOptionsSuccess({ options })),
  //         catchError(() => EMPTY)
  //       )
  //     )
  //   )
  // );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) { }
}