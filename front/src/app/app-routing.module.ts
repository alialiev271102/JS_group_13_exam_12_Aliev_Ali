import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GalleryComponent} from "./pages/gallery/gallery.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {NewPictureComponent} from "./pages/new-picture/new-picture.component";
import {MyGalleryComponent} from "./pages/my-gallery/my-gallery.component";

const routes: Routes = [
  {path: '', component: GalleryComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'picture/new', component: NewPictureComponent},
  {path: 'picture/myGallery', component: MyGalleryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
