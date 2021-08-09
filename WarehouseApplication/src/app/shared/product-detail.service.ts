import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { ProductDetail } from './product-detail.model';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { DataQueryResponse } from './data-query-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  readonly _http: HttpClient;
  readonly _baseURL = 'https://localhost:44337/api/Products';
  formData: ProductDetail = new ProductDetail();

  constructor(private readonly http: HttpClient) {
    this._http = http;
  }

  getProducts(): Observable<ProductDetail[]> {
    return this.get(this._baseURL);
  }

  // getProduct(id: number, queryParams?: any): Observable<DataQueryResponse<ProductDetail>> {
  //   const params = { id, ...queryParams };
  //   return this.get(this._baseURL, params);
  // }

  get(url: string, httpOptions?: any): Observable<any> {
    return this._http.get(url).pipe(catchError(this._handleError));
  }

  private _handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
