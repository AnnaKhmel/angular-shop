import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Customer } from '../models';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    constructor(private httpClient: HttpClient) { }

    signUp(customer: Omit<Customer, "id">): Observable<{ token: string; customerId: number; }> {
        return this.httpClient.post<{ token: string; customerId: number; }>(`${environment.apiBaseUrl}/customer/signup`, customer);
    }

    signIn(email: string, password: string): Observable<{ token: string; customerId: number; }> {
        return this.httpClient.post<{ token: string; customerId: number; }>(`${environment.apiBaseUrl}/customer/login`, { email, password });
    }
}