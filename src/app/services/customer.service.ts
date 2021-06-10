import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Customer } from '../models';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    constructor(
        private httpClient: HttpClient,
        private errorHandlerService: ErrorHandlerService
    ) { }

    signup(customer: Omit<Customer, "id">): Observable<Customer> {
        return this.httpClient
            .post<Customer>(`${environment.apiBaseUrl}/customers/signup`, customer)
            .pipe(
                first(),
                catchError(this.errorHandlerService.handleError<Customer>("signup"))
            );
    }

    login(email: Pick<Customer, "email">, password: Pick<Customer, "password">)
        : Observable<{ token: string; customerId: Pick<Customer, "id">; }> {
        return this.httpClient
            .post<{ token: string; customerId: Pick<Customer, "id">; }>(`${environment.apiBaseUrl}/customers/login`, { email, password })
            .pipe(
                first(),
                catchError(
                    this.errorHandlerService.handleError<{ token: string; customerId: Pick<Customer, "id">; }>("login")
                )
            );
    }
}