import { Action } from '@ngrx/store';

import * as AccountActions from '../actions/account.actions';

export interface AccountState {
  errorMessage: string;
  pending: boolean;
};

export const initialState: AccountState = {
  errorMessage: '',
  pending: false
};

export function accountReducer(state = initialState, action: Action): AccountState {
  switch (action.type) {

    case AccountActions.LOGIN:
      const loginAction = <AccountActions.LoginAction>action;
      console.log('accountReducer.LOGIN');
      return Object.assign({}, state, {
        errorMessage: '',
        pending: true
      });

    case AccountActions.LOGIN_SUCCESS:
      const loginSuccessAction = <AccountActions.LoginSuccessAction>action;
      console.log('accountReducer.LOGIN_SUCCESS');
      return Object.assign({}, state, {
        errorMessage: '',
        pending: false
      });

    case AccountActions.LOGIN_FAILED:
      const loginFailedAction = <AccountActions.LoginFailedAction>action;
      console.log(loginFailedAction);
      return Object.assign({}, state, {
        errorMessage: loginFailedAction.errorMessage.error.error_description,
        pending: false
      });

    default:
      return state;

  }
}

