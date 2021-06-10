import { createAction, props } from '@ngrx/store';
import { Category, Gender } from '../models';

export const loadCategories = createAction('[Categories] Load', props<{ gender: Gender }>());
export const loadCategoriesSuccess = createAction('[Categories] Load success', props<{ categories: Category[] }>());
