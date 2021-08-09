import { FormGroup } from "@angular/forms";

export interface InlineEditable {
  productId: number;
  editable: boolean;
  loading: boolean;
  dataForm: FormGroup;

  resetDataForm(): void;
}