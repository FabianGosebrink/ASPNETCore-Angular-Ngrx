import { Action } from '@ngrx/store';

import * as AccountActions from '../actions/account.actions';

export interface AccountState {
    authenticated: boolean;
    errorMessage: string;
};

export const initialState: AccountState = {
    authenticated: false,
    errorMessage: ''
};

export function accountReducer(state = initialState, action: Action): AccountState {
    switch (action.type) {

        case AccountActions.LOGIN_SUCCESS:
            const loginSuccessAction = <AccountActions.LoginSuccessAction>action;
            return Object.assign({}, state, {
                authenticated: true,
                errorMessage: ''
            });

        case AccountActions.LOGIN_FAILED:
            const loginFailedAction = <AccountActions.LoginFailedAction>action;
            return Object.assign({}, state, {
                authenticated: false,
                errorMessage: loginFailedAction.errorMessage
            });

        default:
            return state;

    }
}

