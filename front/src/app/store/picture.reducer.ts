import {createReducer, on} from "@ngrx/store";
import {PictureState} from "./types";
import {
  createPictureFailure,
  createPictureRequest,
  createPictureSuccess,
  fetchPictureFailure,
  fetchPictureRequest, fetchPictureSuccess
} from "./picture.actions";


const initialState: PictureState = {
  picture: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
};

export const pictureReducer = createReducer(
  initialState,
  on(fetchPictureRequest, state => ({...state, fetchLoading: true})),
  on(fetchPictureSuccess, (state, {picture}) => ({
    ...state,
    fetchLoading: false,
    picture
  })),
  on(fetchPictureFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),
  on(createPictureRequest, state => ({...state, createLoading: true})),
  on(createPictureSuccess, state => ({...state, createLoading: false})),
  on(createPictureFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error,
  }))
);
