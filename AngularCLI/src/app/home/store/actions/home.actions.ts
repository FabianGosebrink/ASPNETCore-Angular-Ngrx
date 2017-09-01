import { FoodItem } from '../../../shared/models/foodItem.model';
import { Action } from '@ngrx/store';

export const LOAD_FOOD = 'LOAD_FOOD'
export const LOAD_FOOD_SUCCESS = 'LOAD_FOOD_SUCCESS'

export const LOAD_RANDOM_MEAL = 'LOAD_RANDOM_MEAL'
export const LOAD_RANDOM_MEAL_SUCCESS = 'LOAD_RANDOM_MEAL_SUCCESS'

export class LoadFoodAction implements Action {
    readonly type = LOAD_FOOD;
    constructor() { }
}

export class LoadFoodSuccessAction implements Action {
    readonly type = LOAD_FOOD_SUCCESS;
    constructor(public foodItems: FoodItem[]) { }
}

export class LoadRandomMealAction implements Action {
    readonly type = LOAD_RANDOM_MEAL;
    constructor() { }
}

export class LoadRandomMealSuccessAction implements Action {
    readonly type = LOAD_RANDOM_MEAL_SUCCESS;
    constructor(public foodItems: FoodItem[]) { }
}

