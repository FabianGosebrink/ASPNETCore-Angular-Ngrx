import { Action } from '@ngrx/store';

export interface FoodAction<T> extends Action {
    payload?: T;
}

export const ADD_FOOD = 'ADD_FOOD'
export const ADD_FOOD_SUCCESS = 'ADD_FOOD_SUCCESS'
export const DELETE_FOOD = 'DELETE_FOOD'
export const DELETE_FOOD_SUCCESS = 'DELETE_FOOD_SUCCESS'
export const UPDATE_FOOD = 'UPDATE_FOOD'
export const UPDATE_FOOD_SUCCESS = 'UPDATE_FOOD_SUCCESS'
export const LOAD_FOOD = 'LOAD_FOOD'
export const LOAD_FOOD_SUCCESS = 'LOAD_FOOD_SUCCESS'

export const SELECT_FOOD = 'SELECT_FOOD'


export function createActionOfType(type: string, payload?: any) {
    switch (type) {
        case ADD_FOOD:
            return { type: ADD_FOOD, payload: payload };

        case ADD_FOOD_SUCCESS:
            return { type: ADD_FOOD_SUCCESS, payload: payload }

        case DELETE_FOOD:
            return { type: DELETE_FOOD, payload: payload }

        case DELETE_FOOD_SUCCESS:
            return { type: DELETE_FOOD_SUCCESS, payload: payload }

        case UPDATE_FOOD:
            return { type: UPDATE_FOOD, payload: payload }

        case UPDATE_FOOD_SUCCESS:
            return { type: UPDATE_FOOD_SUCCESS, payload: payload }

        case LOAD_FOOD:
            return { type: LOAD_FOOD }

        case LOAD_FOOD_SUCCESS:
            return { type: LOAD_FOOD_SUCCESS, payload: payload }

        case SELECT_FOOD:
            return { type: SELECT_FOOD, payload: payload }

        default:
            throw new Error('Dont know your ActionType');
    }
}
