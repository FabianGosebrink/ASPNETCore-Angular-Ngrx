import { Action } from '@ngrx/store';

import { Token } from '../../../shared/models/token';

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export const LOGOUT = 'LOGOUT'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export class LoginAction implements Action {
    readonly type = LOGIN;
    constructor(public username: string, public password: string) { }
}

export class LoginSuccessAction implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public token: Token) { }
}


export class LogoutAction implements Action {
    readonly type = LOGOUT;
    constructor(public username: string, public password: string) { }
}

export class LogoutSuccessAction implements Action {
    readonly type = LOGOUT_SUCCESS;
    constructor() { }
}
