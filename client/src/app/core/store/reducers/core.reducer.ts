import { StorageService } from '../../services/storage.service';
import * as fromCore from '../actions/core.actions';

export interface CoreState {
  signalRConnectionEstablished: boolean;
  pending: boolean;
}

export const initialState: CoreState = StorageService.loadInitialState();

export function coreReducer(
  state = initialState,
  action: fromCore.CoreActions
): CoreState {
  switch (action.type) {
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
