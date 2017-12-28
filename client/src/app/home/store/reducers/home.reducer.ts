import { Action } from '@ngrx/store';

import { FoodItem } from '../../../shared/models/foodItem.model';
import * as homeActions from '../actions/home.actions';

export interface HomeState {
  randomMeal: { [id: string]: FoodItem };
  loading: boolean;
  loaded: boolean;
}

export const initialState: HomeState = {
  randomMeal: {},
  loading: false,
  loaded: false
};

export function homeReducer(
  state = initialState,
  action: homeActions.HomeActions
): HomeState {
  switch (action.type) {
    case homeActions.LOAD_RANDOM_MEAL: {
      return {
        ...state,
        loading: true
      };
    }

    case homeActions.LOAD_RANDOM_MEAL_SUCCESS: {
      const payload = action.foodItems;
      const randomMeal: { [id: string]: FoodItem } = {};
      payload.forEach((item: FoodItem) => {
        if (item) {
          randomMeal[item.id] = item;
        } else {
          randomMeal[''] = null;
        }
      });

      return {
        ...state,
        randomMeal,
        loaded: true,
        loading: false
      };
    }

    default:
      return state;
  }
}

export const getRandomMeal = (state: HomeState) => state.randomMeal;
export const getRandomMealLoaded = (state: HomeState) => state.loaded;
export const getRandomMealLoading = (state: HomeState) => state.loading;
