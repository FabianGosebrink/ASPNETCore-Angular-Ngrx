import { Action } from '@ngrx/store';
import { FoodItem } from '../../../shared/models/foodItem.model';

export interface FoodAction<T> extends Action {
    payload?: T;
}

/*
 * action types
 */

export const ADD_FOOD = 'ADD_FOOD'
export const DELETE_FOOD = 'DELETE_FOOD'
export const LOAD_FOOD = 'LOAD_FOOD'
export const FOOD_LOADED = 'FOOD_LOADED'

/*
 * action creators
 */

export function createAddFoodAction(foodItem: FoodItem): FoodAction<FoodItem> {
    return { type: ADD_FOOD, payload: foodItem }
}

export function createDeleteFoodAction(foodItem: FoodItem): FoodAction<FoodItem> {
    return { type: DELETE_FOOD, payload: foodItem }
}

export function createFoodLoadedAction(foodItem: FoodItem[]): FoodAction<FoodItem[]> {
    return { type: FOOD_LOADED, payload: foodItem }
}

export function createLoadFoodAction(): FoodAction<FoodItem> {
    return { type: LOAD_FOOD }
}
