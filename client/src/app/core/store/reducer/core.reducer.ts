import { StorageService } from '../../services/storage.service';
import { Action } from '@ngrx/store';

import * as CoreActions from '../actions/core.actions';

export interface CoreState {
  isAuthenticated: boolean,
  pending: boolean,
  errorMessage: string
};

export const initialState: CoreState = StorageService.loadInitialState();

export function coreReducer(state = initialState, action: Action): CoreState {
  switch (action.type) {

    case CoreActions.LOGIN:
      const loginAction = <CoreActions.LoginAction>action;
      return Object.assign({}, state, {
        errorMessage: '',
        isAuthenticated: true,
        pending: true
      });

    case CoreActions.LOGIN_SUCCESS:
      const loginSuccessAction = <CoreActions.LoginSuccessAction>action;
      return Object.assign({}, state, {
        errorMessage: '',
        isAuthenticated: true,
        pending: false
      });

    case CoreActions.LOGOUT:
      return Object.assign({}, state, {
        errorMessage: '',
        isAuthenticated: false,
        pending: false
      });

    case CoreActions.LOGIN_FAILED:
      const loginFailedAction = <CoreActions.LoginFailedAction>action;
      return Object.assign({}, state, {
        errorMessage: loginFailedAction.errorMessage.error.error_description,
        isAuthenticated: false,
        pending: false
      });

    default:
      return state;
  }
}
