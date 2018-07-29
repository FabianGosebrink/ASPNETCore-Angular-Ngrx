import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromFood from './food.reducer';
import * as fromIngredients from './ingredient.reducer';

export interface FoodState {
  foods: fromFood.FoodState;
  ingredients: fromIngredients.IngredientState;
}

export const reducers: ActionReducerMap<FoodState> = {
  foods: fromFood.foodItemsReducer,
  ingredients: fromIngredients.ingredientsReducer
};

export const getFoodState = createFeatureSelector<FoodState>('food');
