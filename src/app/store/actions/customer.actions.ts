import { createAction, props } from '@ngrx/store';
import { Customer } from '../../models';

export const signIn = createAction('[Customer] Sign in', props<{ email: string, password: string }>());
export const signInSuccess = createAction('[Customer] Sign in success', props<{ customerId: number, token: string }>());
export const signInError = createAction('[Customer] Sign in error', props<{ errorMessage: string }>());

export const signUp = createAction('[Customer] Sign up', props<{ customer: Customer }>());
export const signUpSuccess = createAction('[Customer] Sign up success', props<{ customerId: number, token: string }>());
export const signUpError = createAction('[Customer] Sign up error', props<{ errorMessage: string }>());

export const logout = createAction('[Customer] Logout');
