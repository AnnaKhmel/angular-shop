import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProductService } from './../services';
import * as ProductsListActions from './products-list.actions';

@Injectable()
export class ShopEffects {
 
  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsListActions.loadProducts),
    mergeMap(() => this.productService.getProducts()
      .pipe(
        map(products => ProductsListActions.loadProductSuccess({ products })),
        catchError(() => EMPTY)
      ))
    )
  );
 
  constructor(
    private actions$: Actions,
    private productService: ProductService
   ) {}
}