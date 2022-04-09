import { createAction, props } from '@ngrx/store';
import {Picture, PictureData} from "../models/picture.model";

export const fetchPictureRequest = createAction('[Picture] Fetch Request');
export const fetchPictureSuccess = createAction(
  '[Picture] Fetch Success',
  props<{picture: Picture[]}>()
);
export const fetchPictureFailure = createAction(
  '[Picture] Fetch Failure',
  props<{error: string}>()
);
export const fetchSomePictureRequest = createAction(
  '[Picture] Fetch Some Request',
  props<{id: string}>()
);
export const fetchSomePictureSuccess = createAction(
  '[Picture] Fetch Some Success',
  props<{picture: Picture[]}>()
);
export const fetchSomePictureFailure = createAction(
  '[Picture] Fetch Some Failure',
  props<{error: string}>()
);

export const createPictureRequest = createAction(
  '[Picture] Create Request',
  props<{pictureData: PictureData}>()
);
export const createPictureSuccess = createAction(
  '[Picture] Create Success'
);
export const createPictureFailure = createAction(
  '[Picture] Create Failure',
  props<{error: string}>()
);
