import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { AuthenticationService } from '../../../core/services/authentication.service';
import * as SharedActions from '../actions/shared.actions';

@Injectable()
export class SharedEffects {

  @Effect({ dispatch: false }) logout$: Observable<Action> = this.actions$
    .ofType(SharedActions.LOGOUT)
    .do((action: SharedActions.LogoutAction) =>
      this.authService.logoutUser()
    );

  constructor(
    private authService: AuthenticationService,
    private actions$: Actions
  ) { }
}
