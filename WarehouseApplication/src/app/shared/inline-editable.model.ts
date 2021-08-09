import { FormGroup } from "@angular/forms";

export interface InlineEditable {
  id: number;
  editable: boolean;
  loading: boolean;
  dataForm: FormGroup;

  resetDataForm(): void;
}