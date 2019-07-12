import * as fromHome from './home.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface HomeState {
  home: fromHome.HomeReduerState;
}

export const reducers: ActionReducerMap<HomeState> = {
  home: fromHome.homeReducer
};

export const getHomeState = createFeatureSelector<HomeState>('home');
