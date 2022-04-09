import {fetchPictureRequest} from "../store/picture.actions";

export class Picture {
  constructor(
    public id: string,
    public creatorUserId: string,
    public userName: string,
    public title: string,
    public image: string,
  ) {}
}

export interface PictureData {
  [key: string]: any,
  creatorUserId: string,
  userName:string
  title: string,
  image: File | null,
}

export interface ApiPictureData {
  _id: string,
  creatorUserId: string,
  userName:string
  title: string,
  image: string
}
