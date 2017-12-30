import { StorageService } from '../../services/storage.service';
import { Action } from '@ngrx/store';

import * as fromCore from '../actions/core.actions';

export interface CoreState {
  isAuthenticated: boolean;
  pending: boolean;
  errorMessage: string;
}

export const initialState: CoreState = StorageService.loadInitialState();

export function coreReducer(
  state = initialState,
  action: fromCore.CoreActions
): CoreState {
  switch (action.type) {
    case fromCore.LOGIN:
      const loginAction = <fromCore.LoginAction>action;
      return Object.assign({}, state, {
        errorMessage: '',
        isAuthenticated: true,
        pending: true
      });

    case fromCore.LOGIN_SUCCESS:
      const loginSuccessAction = <fromCore.LoginSuccessAction>action;
      return Object.assign({}, state, {
        errorMessage: '',
        isAuthenticated: true,
        pending: false
      });

    case fromCore.LOGOUT:
      return Object.assign({}, state, {
        errorMessage: '',
        isAuthenticated: false,
        pending: false
      });

    case fromCore.LOGIN_FAILED:
      const loginFailedAction = <fromCore.LoginFailedAction>action;
      return Object.assign({}, state, {
        errorMessage: loginFailedAction.errorMessage.error.error_description,
        isAuthenticated: false,
        pending: false
      });

    default:
      return state;
  }
}

export const getPending = (state: CoreState) => state.pending;
export const getIsAuthenticated = (state: CoreState) => state.isAuthenticated;
export const getErrorMessage = (state: CoreState) => state.errorMessage;
