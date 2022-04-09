import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Picture} from "../../models/picture.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/types";
import {fetchPictureRequest} from "../../store/picture.actions";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "./modal/modal.component";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.sass']
})
export class GalleryComponent implements OnInit {

  pictures: Observable<Picture[]>
  loading: Observable<boolean>
  error: Observable<null | string>
  dialogPic!: Picture

  constructor(private store: Store<AppState>, private dialog: MatDialog) {
    this.pictures = store.select(state => state.pictures.picture);
    this.loading = store.select(state => state.pictures.fetchLoading);
    this.error = store.select(state => state.pictures.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchPictureRequest());

  }

  openDialog(event: any) {
    const id = event.currentTarget.id;
    this.pictures.subscribe(pic => {
      pic.forEach((pic) => {
        if (id === pic.id) {
          this.dialogPic = pic;
        }
      })

    })
    this.dialog.open(ModalComponent, {
      data: {
        id: this.dialogPic.id,
        creatorUserId: this.dialogPic.creatorUserId,
        userName: this.dialogPic.userName,
        title: this.dialogPic.title,
        image: this.dialogPic.image,
      }
    });
  }

}
