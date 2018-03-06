import { Action } from '@ngrx/store';

import { FoodItem } from '../../../shared/models/foodItem.model';

export const ADD_FOOD = '[Foods] ADD_FOOD';
export const ADD_FOOD_SUCCESS = '[Foods] ADD_FOOD_SUCCESS';
export const LOAD_FOOD = '[Foods] LOAD_FOOD';
export const LOAD_FOOD_SUCCESS = '[Foods] LOAD_FOOD_SUCCESS';
export const DELETE_FOOD = '[Foods] DELETE_FOOD';
export const DELETE_FOOD_SUCCESS = '[Foods] DELETE_FOOD_SUCCESS';
export const UPDATE_FOOD = '[Foods] UPDATE_FOOD';
export const UPDATE_FOOD_SUCCESS = '[Foods] UPDATE_FOOD_SUCCESS';
export const FOOD_ERROR = '[Foods] FOOD_ERROR';

export class LoadFoodAction implements Action {
  readonly type = LOAD_FOOD;
  constructor() {}
}

export class LoadFoodSuccessAction implements Action {
  readonly type = LOAD_FOOD_SUCCESS;
  constructor(public foodItems: FoodItem[]) {}
}

export class AddFoodAction implements Action {
  readonly type = ADD_FOOD;
  constructor(public foodItem: FoodItem) {}
}

export class AddFoodSuccessAction implements Action {
  readonly type = ADD_FOOD_SUCCESS;
  constructor(public foodItem: FoodItem) {}
}

export class DeleteFoodAction implements Action {
  readonly type = DELETE_FOOD;
  constructor(public foodItem: FoodItem) {}
}

export class DeleteFoodSuccessAction implements Action {
  readonly type = DELETE_FOOD_SUCCESS;
  constructor(public foodItem: FoodItem) {}
}

export class UpdateFoodAction implements Action {
  readonly type = UPDATE_FOOD;
  constructor(public foodItem: FoodItem) {}
}

export class UpdateFoodSuccessAction implements Action {
  readonly type = UPDATE_FOOD_SUCCESS;
  constructor(public foodItem: FoodItem) {}
}

export class FoodErrorAction implements Action {
  readonly type = FOOD_ERROR;
  constructor(public error: any) {}
}

export type FoodActions =
  | FoodErrorAction
  | UpdateFoodAction
  | UpdateFoodSuccessAction
  | LoadFoodSuccessAction
  | LoadFoodAction
  | AddFoodAction
  | AddFoodSuccessAction
  | DeleteFoodAction
  | DeleteFoodSuccessAction;
