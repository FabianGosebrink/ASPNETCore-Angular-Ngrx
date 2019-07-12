import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromFood from './food.reducer';
import * as fromIngredients from './ingredient.reducer';

export interface FoodState {
  foods: fromFood.FoodReducerState;
  ingredients: fromIngredients.IngredientReducerState;
}

export const reducers: ActionReducerMap<FoodState> = {
  foods: fromFood.foodReducer,
  ingredients: fromIngredients.ingredientReducer
};

export const getFoodState = createFeatureSelector<FoodState>('food');
