import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { ProductDetailUpdatePayload } from 'src/app/shared/product-detail.model';
import { ProductDetailService } from 'src/app/shared/product-detail.service';
import { UtilServiceService } from 'src/app/shared/util-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  formData: FormGroup;

  constructor(
    private readonly _productDetailService: ProductDetailService,
    private readonly _utilServiceService: UtilServiceService,
    private readonly _dialogRef: MatDialogRef<ProductDetailComponent>
  ) { }

  ngOnInit(): void {
    this.formData = new FormGroup({
      productName: new FormControl(null, [Validators.required]),
      capacity: new FormControl(null, [Validators.required, Validators.min(0)]),
      quantity: new FormControl(null),
    })

    this.formData.controls.quantity.setValidators([
      (control: AbstractControl) => Validators.max(this.formData.controls.capacity.value)(control)
    ])

    this.formData.controls.quantity.updateValueAndValidity();
  }

  public create(): void {
    const payload: ProductDetailUpdatePayload = {
      productName: this.formData.controls.productName.value,
      capacity: this.formData.controls.capacity.value,
      quantity: this.formData.controls.quantity.value
    }

    this._utilServiceService.execute(this._productDetailService.createProducts(payload))
      .subscribe(reponseData => { this._dialogRef.close(reponseData.productId) });
  }
}
