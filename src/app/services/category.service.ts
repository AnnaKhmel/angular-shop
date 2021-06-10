import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Category, Gender } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpClient: HttpClient) { }

  getCategories(gender: Gender): Observable<Category[]> {
    let params = new HttpParams();
    params = params.append('gender', gender);
    
    return this.httpClient.get(`${environment.apiBaseUrl}/categories`, { params })
      .pipe(map((res: any) => res.data as Category[]));
  }
}