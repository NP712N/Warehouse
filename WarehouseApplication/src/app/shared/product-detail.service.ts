import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { ProductDetail, ProductDetailUpdatePayload } from './product-detail.model';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  readonly _http: HttpClient;
  readonly _baseURL = 'https://localhost:44337/api/Products';
  formData: ProductDetail = new ProductDetail();

  private dataSource = new BehaviorSubject<ProductDetail[]>([]);
  currentDataSource = this.dataSource.asObservable();

  constructor(
    private readonly http: HttpClient) {
    this._http = http;
  }

  dataSourceOnchanged(dataSource: ProductDetail[]) {
    this.dataSource.next(dataSource);
  }

  dataItemOnchanged(dataItem: ProductDetail) {
    var dataChanged = this.dataSource.value.map(item => {
      if (item.productId == dataItem.productId) {
        item = dataItem;
      }

      return item;
    });

    this.dataSource.next(dataChanged);
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

  updateProductCapacity(id: number, capacity: number): Observable<void> {
    return this.patch(this._baseURL + `/${id}/` + capacity);
  }

  deleteProductDetail(id: number): Observable<void> {
    return this.delete(this._baseURL + `/${id}`);
  }



  get(url: string, httpOptions?: any): Observable<any> {
    return this._http.get(url).pipe(delay(1500), catchError(this._handleError));
  }

  post(url: string, payload: ProductDetailUpdatePayload): Observable<any> {
    return this._http.post(url, payload).pipe(catchError(this._handleError));
  }

  patch(url: string, payload?: any): Observable<any> {
    return this._http.patch(url, payload).pipe(catchError(this._handleError));
  }

  delete(url: string): Observable<any> {
    return this._http.delete(url).pipe(catchError(this._handleError));
  }

  private _handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
