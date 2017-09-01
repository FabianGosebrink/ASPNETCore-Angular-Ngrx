import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Rx';

import { AuthenticationService } from '../../../core/services/authentication.service';
import { Token } from '../../../shared/models/token';
import * as AccountActions from '../actions/account.actions';

@Injectable()
export class AccountEffects {

    @Effect() login$: Observable<Action> = this.actions$.ofType(AccountActions.LOGIN)
        .switchMap((action: AccountActions.LoginAction) =>
            this.authService.loginUser(action.username, action.password)
                .map((data: Token) => {
                    return new AccountActions.LoginSuccessAction(data);
                })
                .catch((error: any) => {
                    return of(new AccountActions.LoginFailedAction(error));
                })
        );

    @Effect() logout$: Observable<Action> = this.actions$.ofType(AccountActions.LOGOUT)
        .do((action: AccountActions.LoginAction) =>
            this.authService.logoutUser()
        );

    constructor(
        private authService: AuthenticationService,
        private actions$: Actions
    ) { }
}
