import * as fromFood from './food.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface FoodState {
  foods: fromFood.FoodState;
}

export const reducers: ActionReducerMap<FoodState> = {
  foods: fromFood.foodItemsReducer
};

export const getFoodState = createFeatureSelector<FoodState>('food');
