import { FoodItem } from '../../../shared/models/foodItem.model';
import { Action } from '@ngrx/store';

export const ADD_FOOD = 'ADD_FOOD'
export const ADD_FOOD_SUCCESS = 'ADD_FOOD_SUCCESS'
export const DELETE_FOOD = 'DELETE_FOOD'
export const DELETE_FOOD_SUCCESS = 'DELETE_FOOD_SUCCESS'
export const UPDATE_FOOD = 'UPDATE_FOOD'
export const UPDATE_FOOD_SUCCESS = 'UPDATE_FOOD_SUCCESS'
export const LOAD_FOOD = 'LOAD_FOOD'
export const LOAD_FOOD_SUCCESS = 'LOAD_FOOD_SUCCESS'
export const LOAD_SINGLE_FOOD = 'LOAD_SINGLE_FOOD'
export const LOAD_SINGLE_FOOD_SUCCESS = 'LOAD_SINGLE_FOOD_SUCCESS'

export const SELECT_FOOD = 'SELECT_FOOD'
export const SELECT_FOOD_SUCCESS = 'SELECT_FOOD_SUCCESS'

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

export class LoadFoodAction implements Action {
    readonly type = LOAD_FOOD;
    constructor() {}
}

export class LoadFoodSuccessAction implements Action {
    readonly type = LOAD_FOOD_SUCCESS;
    constructor(public foodItems: FoodItem[]) {}
}

export class SelectFoodAction implements Action {
    readonly type = SELECT_FOOD;
    constructor(public foodItem: FoodItem) {}
}

export class SelectFoodSuccessAction implements Action {
    readonly type = SELECT_FOOD_SUCCESS;
    constructor(public foodItem: FoodItem) {}
}

export class LoadSingleFoodAction implements Action {
  readonly type = LOAD_SINGLE_FOOD;
  constructor(public id: string) {}
}

export class LoadSingleFoodSuccessAction implements Action {
  readonly type = LOAD_SINGLE_FOOD_SUCCESS;
  constructor(public foodItem: FoodItem) {}
}
