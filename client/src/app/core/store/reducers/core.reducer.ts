import { StorageService } from '../../services/storage.service';
import * as fromCore from '../actions/core.actions';

export interface CoreState {
  isAuthenticated: boolean;
  signalRConnectionEstablished: boolean;
  pending: boolean;
}

export const initialState: CoreState = StorageService.loadInitialState();

export function coreReducer(
  state = initialState,
  action: fromCore.CoreActions
): CoreState {
  switch (action.type) {
    case fromCore.LOGIN: {
      const loginAction = <fromCore.LoginAction>action;

      return { ...state, pending: true };
    }

    case fromCore.LOGIN_SUCCESS: {
      const loginSuccessAction = <fromCore.LoginSuccessAction>action;

      return { ...state, isAuthenticated: true, pending: false };
    }

    case fromCore.LOGOUT: {
      return { ...state, isAuthenticated: false, pending: false };
    }

    case fromCore.LOGIN_FAILED: {
      const loginFailedAction = <fromCore.LoginFailedAction>action;
      return {
        ...state,
        isAuthenticated: false,
        pending: false,
      };
    }

    case fromCore.SIGNALR_ESTABLISHED: {
      return { ...state, signalRConnectionEstablished: true };
    }

    case fromCore.SIGNALR_FAILED: {
      return { ...state, signalRConnectionEstablished: false };
    }

    default: {
      return state;
    }
  }
}

export const getPending = (state: CoreState) => state.pending;
export const getIsAuthenticated = (state: CoreState) => state.isAuthenticated;
