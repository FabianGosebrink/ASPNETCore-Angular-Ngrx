import { Action } from '@ngrx/store';

import { Ingredient } from '../../../shared/models/ingredient.model';

export const LOAD_INGREDIENTS = '[Foods] LOAD_INGREDIENTS';
export const LOAD_INGREDIENTS_SUCCESS = '[Foods] LOAD_INGREDIENTS_SUCCESS';
export const ADD_INGREDIENT = '[Foods] ADD_INGREDIENTS';
export const ADD_INGREDIENT_SUCCESS = '[Foods] ADD_INGREDIENTS_SUCCESS';
export const INGREDIENTS_ERROR = '[Foods] INGREDIENTS_ERROR';

export class LoadIngredientsAction implements Action {
  readonly type = LOAD_INGREDIENTS;
  constructor(public payload: string) {}
}

export class LoadIngredientsSuccessAction implements Action {
  readonly type = LOAD_INGREDIENTS_SUCCESS;
  constructor(public payload: Ingredient[]) {}
}

export class AddIngredientAction implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient, public foodId: string) {}
}

export class AddIngredientSuccessAction implements Action {
  readonly type = ADD_INGREDIENT_SUCCESS;
  constructor(public payload: Ingredient) {}
}

export class IngredientsErrorAction implements Action {
  readonly type = INGREDIENTS_ERROR;
  constructor(public error: any) {}
}

export type IngredientsActions =
  | IngredientsErrorAction
  | AddIngredientAction
  | AddIngredientSuccessAction
  | LoadIngredientsSuccessAction
  | LoadIngredientsAction;
