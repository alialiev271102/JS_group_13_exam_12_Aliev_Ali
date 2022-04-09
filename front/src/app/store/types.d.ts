import { LoginError, RegisterError, User } from '../models/user.model';
import {Picture} from "../models/picture.model";


export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
}

export type PictureState = {
  picture: Picture[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
}

export type AppState = {
  users: UsersState,
  pictures: PictureState,
}
