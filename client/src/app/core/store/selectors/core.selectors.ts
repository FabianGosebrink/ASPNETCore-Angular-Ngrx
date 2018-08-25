import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromCore from '../reducers/core.reducer';

export const getCompleteCoreState = createSelector(
  fromFeature.getCoreState,
  (state: fromFeature.CoreState) => state.core
);

export const getIsAuthenticated = createSelector(
  getCompleteCoreState,
  fromCore.getIsAuthenticated
);

export const getPending = createSelector(
  getCompleteCoreState,
  fromCore.getPending
);
