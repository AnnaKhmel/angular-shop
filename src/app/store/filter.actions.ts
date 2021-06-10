import { createAction, props } from '@ngrx/store';
import { Gender } from '../models';

export const setGender = createAction('[Filter] Set gender', props<{ gender: Gender }>());
export const setCategory = createAction('[Filter] Set category', props<{ categoryId: number }>());
