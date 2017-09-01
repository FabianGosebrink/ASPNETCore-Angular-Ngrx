import { Action } from '@ngrx/store';

export const LOGOUT = 'LOGOUT'

export class LogoutAction implements Action {
    readonly type = LOGOUT;
    constructor() { }
}
