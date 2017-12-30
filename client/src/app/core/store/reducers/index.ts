import * as fromCore from './core.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface CoreState {
  core: fromCore.CoreState;
}

export const reducers: ActionReducerMap<CoreState> = {
  core: fromCore.coreReducer
};

export const getCoreState = createFeatureSelector<CoreState>('core');
