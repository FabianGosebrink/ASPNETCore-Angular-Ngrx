import { Action } from '@ngrx/store';

import { FoodItem } from '../../../shared/models/foodItem.model';

export interface FoodAction<T> extends Action {
    payload?: T;
}

/*
 * action types
 */

export const ADD_FOOD = 'ADD_FOOD'
export const ADD_FOOD_SUCCESS = 'ADD_FOOD_SUCCESS'
export const DELETE_FOOD = 'DELETE_FOOD'
export const DELETE_FOOD_SUCCESS = 'DELETE_FOOD_SUCCESS'
export const UPDATE_FOOD = 'UPDATE_FOOD'
export const LOAD_FOOD = 'LOAD_FOOD'
export const LOAD_FOOD_SUCCESS = 'LOAD_FOOD_SUCCESS'

/*
 * action creators
 */

function createAddFoodAction(foodItem: FoodItem): FoodAction<FoodItem> {
    return { type: ADD_FOOD, payload: foodItem }
}

function createAddFoodSuccessAction(foodItem: FoodItem): FoodAction<FoodItem> {
    return { type: ADD_FOOD_SUCCESS, payload: foodItem }
}

function createDeleteFoodAction(foodItem: FoodItem): FoodAction<FoodItem> {
    return { type: DELETE_FOOD, payload: foodItem }
}

function createDeleteFoodSuccessAction(): FoodAction<FoodItem> {
    return { type: DELETE_FOOD_SUCCESS }
}

function createLoadFoodAction(): FoodAction<FoodItem[]> {
    return { type: LOAD_FOOD }
}

function createFoodLoadSuccessAction(foodItems: FoodItem[]): FoodAction<FoodItem[]> {
    return { type: LOAD_FOOD_SUCCESS, payload: foodItems }
}

function createUpdateFoodAction(foodItem: FoodItem): FoodAction<FoodItem> {
    return { type: UPDATE_FOOD, payload: foodItem }
}

export function createActionOfType(type: string, payload?: any) {
    switch (type) {
        case ADD_FOOD:
            return createAddFoodAction(payload);

        case ADD_FOOD_SUCCESS:
            return createAddFoodSuccessAction(payload);

        case DELETE_FOOD:
            return createDeleteFoodAction(payload);

        case DELETE_FOOD_SUCCESS:
            return createDeleteFoodSuccessAction();

        case UPDATE_FOOD:
            return createUpdateFoodAction(payload);

        case LOAD_FOOD:
            return createLoadFoodAction();

        case LOAD_FOOD_SUCCESS:
            return createFoodLoadSuccessAction(payload);

        default:
            throw new Error('Dont know your ActionType');
    }
}
