import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Picture} from "../../models/picture.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/types";
import {fetchPictureRequest} from "../../store/picture.actions";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.sass']
})
export class GalleryComponent implements OnInit {

  pictures: Observable<Picture[]>
  loading: Observable<boolean>
  error: Observable<null | string>

  constructor(private store: Store<AppState>) {
    this.pictures = store.select(state => state.pictures.picture);
    this.loading = store.select(state => state.pictures.fetchLoading);
    this.error = store.select(state => state.pictures.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchPictureRequest());
  }

}
