import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/types";
import {User} from "../../models/user.model";
import {PictureData} from "../../models/picture.model";
import {createPictureRequest} from "../../store/picture.actions";

@Component({
  selector: 'app-new-picture',
  templateUrl: './new-picture.component.html',
  styleUrls: ['./new-picture.component.sass']
})
export class NewPictureComponent implements OnDestroy {

  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<string | null>;
  profileForm!: FormGroup;
  creatorUserId: string;
  displayName: string;
  user: Observable<User | null>;
  userSub: Subscription;

  constructor(
    private store: Store<AppState>
  ) {
    this.creatorUserId = '';
    this.displayName = '';
    this.user = store.select(state => state.users.user);
    this.userSub = this.user.subscribe(user => {
      this.creatorUserId = user!._id;
      this.displayName = user!.displayName;
    })
    this.loading = store.select(state => state.pictures.createLoading);
    this.error = store.select(state => state.pictures.createError);
    this.profileForm = new FormGroup({
      title: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    });
  }

  addIng() {
    const ingredients = <FormArray>this.profileForm.get('ingredients');
    const ingredientGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('',Validators.required)
    })
    ingredients.push(ingredientGroup);
  }
  getIngControls() {
    const ing = <FormArray>this.profileForm.get('ingredients');
    return ing.controls;
  }

  fieldHasError(fieldName: string, errorType: string) {
    const field = this.profileForm.get(fieldName);
    return Boolean(
      field && field.touched && field.errors?.[errorType]
    );
  }



  onSubmit() {
    const pictureData: PictureData = this.profileForm.value;
    pictureData.creatorUserId = this.creatorUserId;
    pictureData.userName = this.displayName;
    this.store.dispatch(createPictureRequest({pictureData}));
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
