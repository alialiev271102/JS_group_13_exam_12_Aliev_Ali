import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, of, tap} from 'rxjs';
import {Router} from '@angular/router';
import {
  createPictureFailure,
  createPictureRequest,
  createPictureSuccess,
  fetchPictureFailure,
  fetchPictureRequest,
  fetchPictureSuccess, fetchSomePictureFailure, fetchSomePictureRequest, fetchSomePictureSuccess
} from "./picture.actions";
import {PicturesService} from "../services/pictures.service";


@Injectable()
export class PictureEffects {
  fetchPictures = createEffect(() => this.actions.pipe(
    ofType(fetchPictureRequest),
    mergeMap(() => this.pictureService.getPictures().pipe(
      map(picture => fetchPictureSuccess({picture})),
      catchError(() => of(fetchPictureFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  fetchSomePictures = createEffect(() => this.actions.pipe(
    ofType(fetchSomePictureRequest),
    mergeMap(({id}) => this.pictureService.getSomePictures(id).pipe(
      map(picture => fetchSomePictureSuccess({picture})),
      catchError(() => of(fetchSomePictureFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  createCocktail = createEffect(() => this.actions.pipe(
    ofType(createPictureRequest),
    mergeMap(({pictureData}) => this.pictureService.createPicture(pictureData).pipe(
      map(() => createPictureSuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createPictureFailure({error: 'Wrong data'})))
    ))
  ));

  constructor(
    private actions: Actions,
    private pictureService: PicturesService,
    private router: Router
  ) {
  }
}
