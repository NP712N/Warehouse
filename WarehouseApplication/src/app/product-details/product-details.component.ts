import { Component, OnInit } from '@angular/core';
import { ProductDetail, ProductDetailRow, ProductDetailUpdatePayload } from '../shared/product-detail.model';
import { ProductDetailService } from '../shared/product-detail.service';
import { finalize, map, catchError, takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { DataQueryResponse } from '../shared/data-query-response.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UtilServiceService } from '../shared/util-service.service';
import { QuickDeleteComponent } from '../quick-edit/quick-delete/quick-delete.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  dataSource: ProductDetail[] = [];
  isLoading: boolean = false;
  displayedColumns: string[] = ['id', 'name', 'capacity', 'quantity', 'action'];
  formData: FormGroup;
  subscription: Subscription;

  constructor(
    public productDetailService: ProductDetailService,
    private _utilServiceService: UtilServiceService,
    private readonly _dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.formData = new FormGroup({
      productName: new FormControl(null),
      capacity: new FormControl(null),
      quantity: new FormControl(null),
    })
    this._initializeData();

    this.subscription = this.productDetailService.currentDataSource.subscribe(data => {
      const parseData = data.map(item => {
        const row = Object.assign(new ProductDetailRow(), item);
        row.resetDataForm();
        return row;
      });

      this.dataSource = parseData
    })

  }

  public addNewProductDialog(): void {
    const dialogRef = this._dialog.open(ProductDetailComponent);

    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this._initializeData();
      }
    });
  }

  public constructSaveFn(row: ProductDetailRow): () => Observable<number> {
    return () => {
      const payload: ProductDetailUpdatePayload = {
        productName: row.dataForm.controls.productName.value,
        capacity: row.dataForm.controls.capacity.value,
        quantity: row.dataForm.controls.quantity.value
      };

      return this.productDetailService.updateProductDetail(row.productId, payload).pipe(
        finalize(() => {
        }),
        map(() => row.productId)
      );
    }
  }

  public savedItem(product: ProductDetail): void {
    this.productDetailService.dataItemOnchanged(product);
  }

  public constructDetailsFn(): (id: number) => Observable<ProductDetail> {
    return (id: number) => this._utilServiceService.execute(this.productDetailService.getProductDetail(id));
  }

  public delete(id: number): void {
    const dialogRef = this._dialog.open(QuickDeleteComponent);

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this._utilServiceService.execute(this.productDetailService.deleteProductDetail(id))
          .pipe(
            finalize(() => {
              this.isLoading = false;
              this._initializeData();
            }))
          .subscribe();
      }
    });
  }

  private _initializeData() {
    this.isLoading = true;

    this._utilServiceService.execute(this._constructDataQuery())
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }))
      .subscribe(dataResponse => {
        this.productDetailService.dataSourceOnchanged(dataResponse.data);
      });
  }

  private _constructDataQuery(): Observable<DataQueryResponse<ProductDetail>> {
    return this._utilServiceService.execute(this.productDetailService.getProducts())
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
}
