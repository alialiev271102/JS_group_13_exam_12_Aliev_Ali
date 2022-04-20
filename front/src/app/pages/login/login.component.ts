import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/types';
import {Observable, Subscription} from 'rxjs';
import {LoginError, LoginUserData, User} from '../../models/user.model';
import {loginUserRequest, loginUserSuccess} from '../../store/users.actions';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<null | LoginError>;
  authStateSub!: Subscription;

  constructor(
    private store: Store<AppState>,
    private auth: SocialAuthService,
    private http: HttpClient,
    private router: Router
  ) {
    this.loading = store.select(state => state.users.loginLoading);
    this.error = store.select(state => state.users.loginError);
  }

  onSubmit() {
    const userData: LoginUserData = this.form.value;
    this.store.dispatch(loginUserRequest({userData}));
  }

  ngOnInit() {
    this.authStateSub = this.auth.authState.subscribe((user: SocialUser) => {
      console.log(user.name)
      this.http.post<User>(environment.apiUrl + '/users/googleLogin', {
        authToken: user.authToken,
        id: user.id,
        email: user.email,
        displayName: user.name,
        access_token: user.response.access_token,
      }).subscribe(user => {
        this.store.dispatch(loginUserSuccess({user}));
      });
    });

  }

  async googleLogin() {
    await this.auth.signIn(GoogleLoginProvider.PROVIDER_ID);
    await this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.authStateSub.unsubscribe();
  }
}
