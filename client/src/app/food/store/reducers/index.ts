import * as fromFood from './food.reducer';
import * as fromSignalR from './signalR.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface FoodState {
  foods: fromFood.FoodState;
  signalR: fromFood.FoodState;
}

export const reducers: ActionReducerMap<FoodState> = {
  foods: fromFood.foodItemsReducer,
  signalR: fromSignalR.signalRReducer
};

export const getFoodState = createFeatureSelector<FoodState>('food');
