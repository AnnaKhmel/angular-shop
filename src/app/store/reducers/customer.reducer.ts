import { createReducer, on } from '@ngrx/store';
import { Customer } from '../../models';
import * as CustomerActions from '../actions/customer.actions';

export interface CustomerState {
    isAuthenticated: boolean;
    customerId?: number;
    token?: string;
    errorMessage?: string;
}

export const initialState: CustomerState = {
    isAuthenticated: false
};

export const customerReducer = createReducer(
    initialState,
    on(CustomerActions.signInSuccess, (state, { customerId, token }) => ({
        ...state,
        isAuthenticated: true,
        customerId,
        token,
        errorMessage: undefined
    })),
    on(CustomerActions.signInError, (state, { errorMessage }) => ({
        ...state,
        errorMessage,
        isAuthenticated: false,
        customerId: undefined,
        token: undefined
    })),
    on(CustomerActions.signUpSuccess, (state, { customerId, token }) => ({
        ...state,
        isAuthenticated: true,
        customerId,
        token,
        errorMessage: undefined
    })),
    on(CustomerActions.signUpError, (state, { errorMessage }) => ({
        ...state,
        errorMessage,
        isAuthenticated: false,
        customerId: undefined,
        token: undefined
    })),
    on(CustomerActions.logout, state => initialState)
);
