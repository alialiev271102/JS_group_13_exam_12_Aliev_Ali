import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Picture} from "../../models/picture.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/types";
import {fetchPictureRequest, fetchSomePictureRequest} from "../../store/picture.actions";
import {ModalComponent} from "../gallery/modal/modal.component";
import {MatDialog} from "@angular/material/dialog";
import {User} from "../../models/user.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-my-gallery',
  templateUrl: './my-gallery.component.html',
  styleUrls: ['./my-gallery.component.sass']
})
export class MyGalleryComponent implements OnInit, OnDestroy {


  pictures: Observable<Picture[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  dialogPic!: Picture;
  user!: Observable<null | User>;
  deleteSub!: Subscription;
  flag!: boolean;
  sub!: Subscription;
  id!: string;


  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user = store.select(state => state.users.user);
    this.pictures = this.store.select(state => state.pictures.picture)
    this.loading = this.store.select(state => state.pictures.fetchLoading)
    this.error = this.store.select(state => state.pictures.fetchError)
    this.flag = false;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
    const id = this.id;
    this.store.dispatch(fetchSomePictureRequest({id}));
  }

  openDialog(event: any) {
    const id = event.currentTarget.id;
    this.pictures.subscribe(pic => {
      pic.forEach((pic) => {
        if (id === pic.id) {
          this.dialogPic = pic;
        }
      })

    }).unsubscribe();
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

  deletePic(event: any) {
    this.flag = true;
    console.log(event.currentTarget.id)
    this.deleteSub = this.http.delete(environment.apiUrl + '/pictures/' + event.currentTarget.id).subscribe();
    void this.router.navigate(['/']);
  }

  ngOnDestroy() {
    if (this.flag) this.deleteSub.unsubscribe();
  }

}
