import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap, withLatestFrom } from 'rxjs/operators';
import { CategoryService, ProductService } from './../services';
import * as ProductsActions from './actions/products.actions';
import * as CategoriesActions from './actions/categories.actions';
import * as FilterActions from './actions/filter.actions';
import { AppState, selectGender } from '.';

@Injectable()
export class ShopEffects {

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      exhaustMap(action => this.productService.getProducts(action.categoryId, action.gender)
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
      mergeMap(([action, gender]) => [ProductsActions.loadProducts({ categoryId: action.categoryId, gender })])
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }
}