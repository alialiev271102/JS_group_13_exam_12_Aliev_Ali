import {Component, Inject} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/types";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Picture} from "../../../models/picture.model";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent {

  loading: Observable<boolean>
  error: Observable<null | string>

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: Picture,
  ) {
    this.loading = store.select(state => state.pictures.fetchLoading);
    this.error = store.select(state => state.pictures.fetchError);
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
