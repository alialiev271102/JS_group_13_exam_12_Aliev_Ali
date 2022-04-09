import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutComponent} from './ui/layout/layout.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatMenuModule} from "@angular/material/menu";
import {MatSelectModule} from "@angular/material/select";
import {AppStoreModule} from "./app-store.module";
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from "angularx-social-login";
import {environment} from "../environments/environment";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./auth.interceptor";
import { GalleryComponent } from './pages/gallery/gallery.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserTypeDirective } from './directives/user-type.directive';
import { CenteredCardComponent } from './ui/centered-card/centered-card.component';
import { FileInputComponent } from './ui/file-input/file-input.component';
import { ImagePipe } from './pipes/image.pipe';
import { NewPictureComponent } from './pages/new-picture/new-picture.component';
import { ModalComponent } from './pages/gallery/modal/modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import { MyGalleryComponent } from './pages/my-gallery/my-gallery.component';
import { MyGalleryDirective } from './directives/my-gallery.directive';
import { CreateGalleryDirective } from './directives/create-gallery.directive';

const socialConfig: SocialAuthServiceConfig = {
  autoLogin: false,
  providers: [
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(environment.CLIENT_ID),
    }
  ]
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    GalleryComponent,
    LoginComponent,
    RegisterComponent,
    UserTypeDirective,
    MyGalleryDirective,
    CenteredCardComponent,
    FileInputComponent,
    ImagePipe,
    NewPictureComponent,
    ModalComponent,
    MyGalleryComponent,
    CreateGalleryDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule,
    AppStoreModule,
    SocialLoginModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: 'SocialAuthServiceConfig', useValue: socialConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
