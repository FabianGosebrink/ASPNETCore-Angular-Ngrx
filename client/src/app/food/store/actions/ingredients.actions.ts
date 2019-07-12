import { createAction, props } from '@ngrx/store';
import { Ingredient } from '@app/shared/models/ingredient.model';

export const loadIngredients = createAction(
  '[Foods] LOAD_INGREDIENTS',
  props<{ payload: string }>()
);

export const loadIngredientsSuccess = createAction(
  '[Foods] LOAD_INGREDIENTS_SUCCESS',
  props<{ payload: Ingredient[] }>()
);

export const deleteIngredient = createAction(
  '[Foods] DELETE_INGREDIENT',
  props<{ payload: Ingredient; foodId: string }>()
);

export const deleteIngredientSuccess = createAction(
  '[Foods] DELETE_INGREDIENT_SUCCESS',
  props<{ payload: any }>()
);

export const addIngredient = createAction(
  '[Foods] ADD_INGREDIENTS',
  props<{ payload: Ingredient; foodId: string }>()
);

export const addIngredientSuccess = createAction(
  '[Foods] ADD_INGREDIENTS_SUCCESS',
  props<{ payload: Ingredient }>()
);

export const ingredientError = createAction(
  '[Foods] INGREDIENTS_ERROR',
  props<{ payload: any }>()
);
