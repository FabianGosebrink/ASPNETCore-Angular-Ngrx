import { Action } from '@ngrx/store';

import { Token } from '../../../shared/models/token';

export const LOGIN = '[Core] LOGIN';
export const LOGIN_SUCCESS = '[Core] LOGIN_SUCCESS';
export const LOGIN_FAILED = '[Core] LOGIN_FAILED';
export const LOGOUT = '[Core] LOGOUT';
export const SIGNALR_ESTABLISH_CONNECTION =
  '[Core] SIGNALR_ESTABLISH_CONNECTION';
export const SIGNALR_ESTABLISHED = '[Core] SIGNALR_ESTABLISHED';
export const SIGNALR_FAILED = '[Core] SIGNALR_FAILED';

export class LoginAction implements Action {
  readonly type = LOGIN;
  constructor(public username: string, public password: string) {}
}

export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public token: Token) {}
}

export class LoginFailedAction implements Action {
  readonly type = LOGIN_FAILED;
  constructor(public errorMessage: any) {}
}

export class LogoutAction implements Action {
  readonly type = LOGOUT;
  constructor() {}
}

export class SignalREstablishConnectionAction implements Action {
  readonly type = SIGNALR_ESTABLISH_CONNECTION;
  constructor() {}
}

export class SignalREstablishedAction implements Action {
  readonly type = SIGNALR_ESTABLISHED;
  constructor() {}
}

export class SignalRFailedAction implements Action {
  readonly type = SIGNALR_FAILED;
  constructor(public errorMessage: any) {}
}

export type CoreActions =
  | SignalREstablishedAction
  | SignalRFailedAction
  | LoginAction
  | LoginSuccessAction
  | LoginFailedAction
  | LogoutAction;
