import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Token } from '../../../shared/models/token';
import { AbstractNotificationService } from '../../services/abstract-notification.service';
import { AuthenticationService } from '../../services/authentication.service';
import { SignalRService } from '../../services/signalR.service';
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

  @Effect()
  establishSignalRConnection$ = this.actions$
    .ofType(CoreActions.SIGNALR_ESTABLISH_CONNECTION)
    .pipe(
      switchMap((action: CoreActions.SignalREstablishConnectionAction) => {
        return this.signalRService.initializeConnection().pipe(
          tap(() =>
            this.notificationService.showInfo(
              'SignalR',
              'Connection established'
            )
          ),
          map(() => new CoreActions.SignalREstablishedAction()),
          catchError((error: any) => {
            this.notificationService.showError('SignalR', error);
            return of(new CoreActions.SignalRFailedAction(error));
          })
        );
      })
    );

  @Effect({ dispatch: false })
  loginFailed$$ = this.actions$.ofType(CoreActions.LOGIN_FAILED).pipe(
    tap((action: CoreActions.LoginFailedAction) => {
      const errorMessage = action.errorMessage.message;
      this.notificationService.showError('Login Failed', errorMessage);
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
    private notificationService: AbstractNotificationService,
    private signalRService: SignalRService,
    private actions$: Actions,
    private router: Router
  ) {}
}
