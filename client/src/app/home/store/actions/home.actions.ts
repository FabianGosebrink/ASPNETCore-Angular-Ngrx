import { Action } from '@ngrx/store';

import { FoodItem } from '../../../shared/models/foodItem.model';

export const LOAD_RANDOM_MEAL = '[Home] LOAD_RANDOM_MEAL';
export const LOAD_RANDOM_MEAL_SUCCESS = '[Home] LOAD_RANDOM_MEAL_SUCCESS';

export const HOME_ERROR = '[Home] HOME_ERROR';

export class LoadRandomMealAction implements Action {
  readonly type = LOAD_RANDOM_MEAL;
  constructor() {}
}

export class LoadRandomMealSuccessAction implements Action {
  readonly type = LOAD_RANDOM_MEAL_SUCCESS;
  constructor(public foodItems: FoodItem[]) {}
}

export class HomeErrorAction implements Action {
  readonly type = HOME_ERROR;
  constructor(public error: any) {}
}
export type HomeActions =
  | HomeErrorAction
  | LoadRandomMealAction
  | LoadRandomMealSuccessAction;
