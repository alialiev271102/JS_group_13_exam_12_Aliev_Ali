import { NgModule } from '@angular/core';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { EffectsModule } from '@ngrx/effects';
import {usersReducer} from "./store/users.reducer";
import {UsersEffects} from "./store/users.effects";
import {pictureReducer} from "./store/picture.reducer";
import {PictureEffects} from "./store/picture.effects";

const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{users: ['user']}],
    rehydrate: true
  })(reducer);
}

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

const reducers = {
  users: usersReducer,
  pictures: pictureReducer,
};

const effects = [UsersEffects, PictureEffects];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot(effects),
  ],
  exports: [StoreModule, EffectsModule]
})
export class AppStoreModule {}
