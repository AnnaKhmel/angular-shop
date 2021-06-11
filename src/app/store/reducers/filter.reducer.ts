import { createReducer, on } from '@ngrx/store';
import * as FilterActions from './../actions/filter.actions';
import { Gender } from '../../models';

export interface FilterState {
    gender: Gender;
    categoryId?: number;
}

export const initialState: FilterState = {
    gender: Gender.men
};

export const filterReducer = createReducer(
    initialState,
    on(FilterActions.setCategory, (state, { categoryId }) => ({ ...state, categoryId })),
    on(FilterActions.setGender, (state, { gender }) => ({ ...state, gender }))
);
