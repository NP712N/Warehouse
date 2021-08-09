import { FormControl, FormGroup, Validators } from "@angular/forms";
import { InlineEditable } from "./inline-editable.model";

export class ProductDetail {
  productId: number;
  productName: string;
  capacity: number;
  quantity: number;
}

export class ProductDetailRow extends ProductDetail implements InlineEditable {
  id: number;
  editable: boolean;
  loading: boolean;
  dataForm: FormGroup;

  constructor() {
    super();
    this.dataForm = this._constructDataForm();
  }

  public resetDataForm(): void {
    const originalValues = this._constructDataForm().value;
    this.dataForm.reset(originalValues);
  }

  private _constructDataForm(): FormGroup {
    return new FormGroup({
      productName: new FormControl(this.productName, [Validators.required]),
      capacity: new FormControl(this.capacity),
      quantity: new FormControl(this.quantity),
    });
  }
}