import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { CategoryService, ProductService } from './../services';
import * as ProductsActions from './products.actions';
import * as CategoriesActions from './categories.actions';
import * as FilterActions from './filter.actions';

@Injectable()
export class ShopEffects {

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      mergeMap(() => this.productService.getProducts()
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
      exhaustMap(action =>
        this.categoryService.getCategories(action.gender).pipe(
          mergeMap(categories => [
              CategoriesActions.loadCategoriesSuccess({ categories }),
              FilterActions.setCategory({ categoryId: categories?.[0]?.id })
            ]
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  setCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilterActions.setCategory),
      exhaustMap(action => [ProductsActions.loadProducts()])
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }
}