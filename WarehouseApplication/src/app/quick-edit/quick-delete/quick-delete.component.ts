import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductDetailComponent } from 'src/app/product-details/product-detail/product-detail.component';

@Component({
  selector: 'app-quick-delete',
  templateUrl: './quick-delete.component.html',
  styleUrls: ['./quick-delete.component.css']
})
export class QuickDeleteComponent implements OnInit {

  constructor(
    private readonly _dialogRef: MatDialogRef<ProductDetailComponent>
  ) { }

  ngOnInit(): void {
  }

  public yes(): void {
    this._dialogRef.close(true);
  }

  public no(): void {
    this._dialogRef.close(false);
  }

}
