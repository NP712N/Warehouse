import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { InlineEditable } from 'src/app/shared/inline-editable.model';

@Component({
  selector: 'app-quick-edit',
  templateUrl: './quick-edit.component.html',
  styleUrls: ['./quick-edit.component.css']
})
export class QuickEditComponent implements OnInit {

  @Input() data: InlineEditable;
  @Input() detailsFn: (id: number) => Observable<any>;
  @Input() saveFn: () => Observable<number>;
  @Output() saved = new EventEmitter<any>();

  constructor(
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  public enableEditMode(): void {
    this._toggleEditMode(true);
  }

  public saveChanges(): void {
    this.saveFn().subscribe(
      (id: number) => {
        this._toastr.success("OK", "Update product");
        this._loadItemDetail(id);
        this._toggleEditMode(false);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this._toastr.error(error.error[""].errors[0].errorMessage, "Update product");
      }
    )
  }

  public discardChanges(): void {
    this.data.resetDataForm();
    this._toggleEditMode(false);
  }

  private _toggleEditMode(editable: boolean): void {
    this.data.editable = editable;
  }

  private _loadItemDetail(id: number): void {
    this.data.loading = true;

    this.detailsFn(id)
      .pipe(finalize(() => { this.data.loading = false; }))
      .subscribe(data => {
        Object.assign(this.data, data);
        this.data.resetDataForm();
        this.saved.emit(data);
      })
  }

}
