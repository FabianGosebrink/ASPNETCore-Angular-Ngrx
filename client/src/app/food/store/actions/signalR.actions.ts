import { Action } from '@ngrx/store';

import { FoodItem } from '../../../shared/models/foodItem.model';
import { Ingredient } from '../../../shared/models/ingredient.model';

export const RECEIVED_FOOD_ADDED = '[SignalR] RECEIVED_FOOD_ADDED';
export const RECEIVED_INGREDIENT_ADDED = '[SignalR] RECEIVED_INGREDIENT_ADDED';
export const RECEIVED_FOOD_UPDATED = '[SignalR] RECEIVED_FOOD_UPDATED';
export const RECEIVED_FOOD_DELETED = '[SignalR] RECEIVED_FOOD_DELETED';
export const RECEIVED_INGREDIENT_DELETED =
  '[SignalR] RECEIVED_INGREDIENT_DELETED';

export class ReceivedFoodAddedAction implements Action {
  readonly type = RECEIVED_FOOD_ADDED;
  constructor(public foodItem: FoodItem) {}
}

export class ReceivedIngredientAddedAction implements Action {
  readonly type = RECEIVED_INGREDIENT_ADDED;
  constructor(public payload: Ingredient) {}
}

export class ReceivedIngredientDeletedAction implements Action {
  readonly type = RECEIVED_INGREDIENT_DELETED;
  constructor(public ingredientId: string) {}
}

export class ReceivedFoodUpdatedAction implements Action {
  readonly type = RECEIVED_FOOD_UPDATED;
  constructor(public foodItem: any) {}
}

export class ReceivedFoodDeletedAction implements Action {
  readonly type = RECEIVED_FOOD_DELETED;
  constructor(public foodId: number) {}
}

export type SignalRActions =
  | ReceivedFoodAddedAction
  | ReceivedIngredientAddedAction
  | ReceivedIngredientDeletedAction
  | ReceivedFoodUpdatedAction
  | ReceivedFoodDeletedAction;
