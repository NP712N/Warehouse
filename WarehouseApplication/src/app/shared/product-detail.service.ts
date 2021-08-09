import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { ProductDetail, ProductDetailUpdatePayload } from './product-detail.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  readonly _http: HttpClient;
  readonly _baseURL = 'https://localhost:44337/api/Products';
  formData: ProductDetail = new ProductDetail();

  constructor(
    private readonly http: HttpClient) {
    this._http = http;
  }

  createProducts(payload: ProductDetailUpdatePayload): Observable<ProductDetail> {
    return this.post(this._baseURL, payload);
  }

  getProducts(): Observable<ProductDetail[]> {
    return this.get(this._baseURL);
  }

  getProductDetail(id: number): Observable<ProductDetail> {
    return this.get(this._baseURL + `/${id}`);
  }

  updateProductDetail(id: number, payload: ProductDetailUpdatePayload): Observable<void> {
    return this.patch(this._baseURL + `/${id}`, payload);
  }

  deleteProductDetail(id: number): Observable<void> {
    return this.delete(this._baseURL + `/${id}`);
  }



  get(url: string, httpOptions?: any): Observable<any> {
    return this._http.get(url).pipe(catchError(this._handleError));
  }

  post(url: string, payload: ProductDetailUpdatePayload): Observable<any> {
    return this._http.post(url, payload).pipe(catchError(this._handleError));
  }

  patch(url: string, payload: ProductDetailUpdatePayload): Observable<any> {
    return this._http.patch(url, payload).pipe(catchError(this._handleError));
  }

  delete(url: string): Observable<any> {
    return this._http.delete(url).pipe(catchError(this._handleError));
  }

  private _handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
