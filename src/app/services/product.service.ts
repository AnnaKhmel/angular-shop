import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Gender, Product, ProductOption } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient: HttpClient) { }

  getProducts(categoryId: number, gender: Gender): Observable<Product[]> {
    let params = new HttpParams();
    params = params.append('categoryId', categoryId);
    params = params.append('gender', gender);
    
    return this.httpClient.get(`${environment.apiBaseUrl}/products`, { params })
      .pipe(map((res: any) => res.data as Product[]));
  }

  getProductOptions(productId: number): Observable<ProductOption[]> {
    return this.httpClient.get(`${environment.apiBaseUrl}/products/${productId}/options`)
      .pipe(map((res: any) => res.data as ProductOption[]));
  }
}