import { Action } from '@ngrx/store';

import { Token } from '../../../shared/models/token';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';

export class LoginAction implements Action {
    readonly type = LOGIN;
    constructor(public username: string, public password: string) { }
}

export class LoginSuccessAction implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public token: Token) { }
}

export class LoginFailedAction implements Action {
    readonly type = LOGIN_FAILED;
    constructor(public errorMessage: any) { }
}

export class LogoutAction implements Action {
    readonly type = LOGOUT;
    constructor() { }
}
