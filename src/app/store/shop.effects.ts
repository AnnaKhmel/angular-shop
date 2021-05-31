import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Product } from '../models/product';
import * as ProductsListActions from './products-list.actions';

@Injectable()
export class ShopEffects {
 
  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsListActions.loadProducts),
    mergeMap(() => this.http.get<Product[]>('./assets/products.json')
      .pipe(
        map(products => ProductsListActions.loadProductSuccess({ products })),
        catchError(() => EMPTY)
      ))
    )
  );
 
  constructor(
    private actions$: Actions,
    private http: HttpClient
   ) {}
}