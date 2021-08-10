import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, Column, ColumnApi, GridApi, RowNode } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { DataQueryResponse } from 'src/app/shared/data-query-response.model';
import { ProductDetail, ProductDetailRow, ProductDetailUpdatePayload } from 'src/app/shared/product-detail.model';
import { ProductDetailService } from 'src/app/shared/product-detail.service';
import { UtilServiceService } from 'src/app/shared/util-service.service';

@Component({
  selector: 'app-product-detail-ag-grid',
  templateUrl: './product-detail-ag-grid.component.html',
  styleUrls: ['./product-detail-ag-grid.component.css']
})
export class ProductDetailAgGridComponent implements OnInit {

  isLoading: boolean = false;
  subscription: Subscription;

  columnDefs = [
    { field: 'productId' },
    {
      field: 'productName',
      editable: true
    },
    {
      field: 'capacity',
      valueParser: 'Number(newValue)',
      editable: true
    },
    {
      field: 'quantity',
      editable: true
    }
  ];

  dataSource: ProductDetail[] = [];
  overlayLoadingTemplate: any;
  defaultColDef: any;

  constructor(
    public productDetailService: ProductDetailService,
    private _utilServiceService: UtilServiceService,
    private _dialog: MatDialog,
    private _toastr: ToastrService
  ) {
    this.overlayLoadingTemplate =
      '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this._initializeData();
  }

  ngOnInit(): void {
    this.subscription = this.productDetailService.currentDataSource.subscribe(data => {
      this.dataSource = data;
    })

    this._setupGridColumns();
    this._initializeData();
  }

  onCellValueChanged(params: any) {
    var changedData = params.data as ProductDetail;
    params.api.applyTransaction({ update: [changedData] });

    const payload: ProductDetailUpdatePayload = {
      productName: changedData.productName,
      capacity: changedData.capacity,
      quantity: changedData.quantity
    };

    this.productDetailService.updateProductDetail(changedData.productId, payload)
      .subscribe(
        (success: any) => {
          this._toastr.success("OK", "Update product");
          this.productDetailService.dataItemOnchanged(changedData);
        },
        (error: HttpErrorResponse) => {
          params.data[params.column.colId] = params.oldValue;
          params.api.applyTransaction({ update: [params.oldValue] });
          this._toastr.error(error.error[""].errors[0].errorMessage, "Update product");
        }
      )
  }

  private _setupGridColumns() {
    this.defaultColDef = {
      flex: 1,
      minWidth: 110,
      resizable: true
    };
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
          return {
            totalCount: dataResponse.length,
            data: dataResponse
          }
        }));
  }
}
