import { createReducer, on } from '@ngrx/store';
import * as CategoriesActions from './../actions/categories.actions';
import { Category } from '../../models';

export interface CategoriesState {
    categories: Category[]
}

export const initialState: CategoriesState = {
    categories: []
};

export const categoriesReducer = createReducer(
    initialState,
    on(CategoriesActions.loadCategoriesSuccess, (state, { categories }) => ({ ...state, categories }))
);
