import { Action } from '@ngrx/store';

import { FoodItem } from '../../../shared/models/foodItem.model';
import * as foodActions from '../actions/food.actions';

export interface FoodState {
  entities: { [id: string]: FoodItem };
  loaded: boolean;
  loading: boolean;
}

export const initialState: FoodState = {
  entities: {},
  loaded: false,
  loading: false
};

export function foodItemsReducer(
  state = initialState,
  action: foodActions.FoodActions
): FoodState {
  switch (action.type) {
    case foodActions.ADD_FOOD_SUCCESS:
    case foodActions.UPDATE_FOOD_SUCCESS: {
      const foodItem = action.foodItem;

      const entities = {
        ...state.entities,
        [foodItem.id]: foodItem
      };

      return {
        ...state,
        entities
      };
    }

    case foodActions.LOAD_FOOD_SUCCESS: {
      const payload = action.foodItems;

      const entities: { [id: string]: FoodItem } = {};

      payload.forEach((item: FoodItem) => {
        entities[item.id] = item;
      });

      return {
        ...state,
        entities,
        loaded: true
      };
    }

    case foodActions.DELETE_FOOD_SUCCESS: {
      const foodItem = action.foodItem;
      const { [foodItem.id]: removed, ...entities } = state.entities;

      return {
        ...state,
        entities
      };
    }

    case foodActions.RECEIVED_FOOD_ADDED: {
      if (!!state.entities[action.foodItem.id]) {
        return state;
      }

      const foodItem = action.foodItem;
      const entities = {
        ...state.entities,
        [foodItem.id]: foodItem
      };

      return {
        ...state,
        entities
      };
    }

    case foodActions.RECEIVED_FOOD_DELETED: {
      if (!state.entities[action.foodId]) {
        return state;
      }

      const { [action.foodId]: removed, ...entities } = state.entities;

      return {
        ...state,
        entities
      };
    }

    case foodActions.RECEIVED_FOOD_UPDATED: {
      const foodItem = action.foodItem;

      const entities = {
        ...state.entities,
        [foodItem.id]: foodItem
      };

      return {
        ...state,
        entities
      };
    }

    default:
      return state;
  }
}

export const getFoodItemEntities = (state: FoodState) => state.entities;
export const getFoodItemsLoaded = (state: FoodState) => state.loaded;
export const getFoodItemsLoading = (state: FoodState) => state.loading;
