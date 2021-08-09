import { Component, OnInit } from '@angular/core';
import { ProductDetail, ProductDetailRow } from '../shared/product-detail.model';
import { ProductDetailService } from '../shared/product-detail.service';
import { finalize, map, catchError, takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { DataQueryResponse } from '../shared/data-query-response.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  dataSource: ProductDetail[];
  isLoading: boolean = false;
  displayedColumns: string[] = ['id', 'name', 'capacity', 'quantity', 'action'];

  formData: FormGroup;

  constructor(public service: ProductDetailService) {

  }

  ngOnInit(): void {
    this.formData = new FormGroup({
      productName: new FormControl(null),
      capacity: new FormControl(null),
      quantity: new FormControl(null),
    })

    this._initializeData();
  }

  public saveChanges(row: ProductDetailRow): void {
    //TODO: update product detail
    console.log(row);
  }

  private _initializeData() {
    this.isLoading = true;

    this.execute(this._constructDataQuery())
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }))
      .subscribe(dataResponse => {
        this.dataSource = dataResponse.data
      });
  }

  private _constructDataQuery(): Observable<DataQueryResponse<ProductDetail>> {
    return this.execute(this.service.getProducts())
      .pipe(
        map(dataResponse => {
          const parseData = dataResponse.map(item => {
            const row = Object.assign(new ProductDetailRow(), item);
            row.resetDataForm();
            return row;
          });

          return {
            totalCount: dataResponse.length,
            data: parseData
          }
        }));
  }

  private execute<T>(observale: Observable<T>, fallbackResult?: T): Observable<T> {
    let _cancellationToken: Subject<void> = new Subject();

    let fn = observale;
    if (fallbackResult) {
      fn = fn.pipe(catchError(() => of(fallbackResult)));
    }

    return fn.pipe(takeUntil(_cancellationToken.asObservable()));
  }
}
