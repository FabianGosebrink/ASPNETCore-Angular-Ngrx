import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Token } from 'app/shared/models/token';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';
import * as CoreActions from '../actions/core.actions';

@Injectable()
export class CoreEffects {
  @Effect()
  login$ = this.actions$.ofType(CoreActions.LOGIN).pipe(
    switchMap((action: CoreActions.LoginAction) => {
      return this.authenticationService
        .loginUser(action.username, action.password)
        .pipe(
          map((data: Token) => new CoreActions.LoginSuccessAction(data)),
          catchError((error: any) =>
            of(new CoreActions.LoginFailedAction(error))
          )
        );
    })
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.ofType(CoreActions.LOGIN_SUCCESS).pipe(
    tap((action: CoreActions.LogoutAction) => {
      this.router.navigate(['/home']);
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.ofType(CoreActions.LOGOUT).pipe(
    tap((action: CoreActions.LogoutAction) => {
      this.authenticationService.logoutUser();
      this.router.navigate(['/home']);
    })
  );

  constructor(
    private authenticationService: AuthenticationService,
    private actions$: Actions,
    private router: Router
  ) {}
}
