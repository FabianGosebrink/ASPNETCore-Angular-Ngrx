import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AuthenticationService } from '../../../core/services/authentication.service';
import { Token } from '../../../shared/models/token';
import * as AccountActions from '../actions/account.actions';

@Injectable()
export class AccountEffects {

  @Effect() login$ = this.actions$
    .ofType(AccountActions.LOGIN)
    .pipe(
      switchMap((action: AccountActions.LoginAction) => {
        return this.authService
          .loginUser(action.username, action.password)
          .pipe(
          map((data: Token) => new AccountActions.LoginSuccessAction(data)),
          catchError((error: any) => of(new AccountActions.LoginFailedAction(error)))
          );
      })
    );


  @Effect({ dispatch: false }) loginSuccess$ = this.actions$
    .ofType(AccountActions.LOGIN_SUCCESS)
    .do(() => this.router.navigate(['/home']));

constructor(
  private authService: AuthenticationService,
  private actions$: Actions,
  private router: Router
) { }
}
