import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiPictureData, Picture, PictureData} from "../models/picture.model";
import {environment} from "../../environments/environment";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PicturesService {



  constructor(private http: HttpClient) { }

  getPictures() {
    return this.http.get<ApiPictureData[]>(environment.apiUrl + '/pictures').pipe(
      map(response => {
        return response.map(pictureData => {
          return new Picture(
            pictureData._id,
            pictureData.creatorUserId,
            pictureData.userName,
            pictureData.title,
            pictureData.image,
          );
        });
      })
    );
  }


  createPicture(pictureData: PictureData) {
    console.log(pictureData);
    const formData = new FormData();
    Object.keys(pictureData).forEach(key => {
      if (pictureData[key] !== null) {
        formData.append(key, pictureData[key]);
      }
    });
    return this.http.post(environment.apiUrl + '/pictures', formData);
  }
}
