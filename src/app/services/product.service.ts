import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Product, ProductOption } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get(`${environment.apiBaseUrl}/product`)
      .pipe(map((res: any) => res.data as Product[]));
  }

  getProductOptions(productId: number): Observable<ProductOption[]> {
    return this.httpClient.get(`${environment.apiBaseUrl}/product/${productId}/options`)
      .pipe(map((res: any) => res.data as ProductOption[]));
  }
}