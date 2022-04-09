import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/types";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Picture} from "../../../models/picture.model";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {

  loading: Observable<boolean>
  error: Observable<null | string>

  constructor(
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: Picture,
    ) {
    this.loading = store.select(state => state.pictures.fetchLoading);
    this.error = store.select(state => state.pictures.fetchError);
  }

  ngOnInit(): void {
    console.log(this.data);
  }

}
