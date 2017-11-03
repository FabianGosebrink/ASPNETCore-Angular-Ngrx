import { Action } from '@ngrx/store';

import { FoodItem } from '../../../shared/models/foodItem.model';
import * as HomeActions from '../actions/home.actions';

export interface HomeState {
  foodItems: FoodItem[],
  randomMeal: FoodItem[],
  loadingRandomMeal: boolean,
  loadingAllItems: boolean
};

export const initialState: HomeState = {
  foodItems: [],
  randomMeal: [],
  loadingRandomMeal: false,
  loadingAllItems: false
};

export function foodItemsHomeReducer(state = initialState, action: Action): HomeState {
  switch (action.type) {

    case HomeActions.LOAD_FOOD:
      const loadFoodAction = <HomeActions.LoadFoodAction>action;
      return Object.assign({}, state, {
        randomMeal: state.randomMeal,
        foodItems: state.foodItems,
        loadingRandomMeal: false,
        loadingAllItems: true
      });

    case HomeActions.LOAD_FOOD_SUCCESS:
      const loadFoodSuccessAction = <HomeActions.LoadFoodSuccessAction>action;
      return Object.assign({}, state, {
        randomMeal: state.randomMeal,
        foodItems: loadFoodSuccessAction.foodItems,
        loadingRandomMeal: false,
        loadingAllItems: false
      });

    case HomeActions.LOAD_RANDOM_MEAL:
      const loadRandomMealAction = <HomeActions.LoadRandomMealAction>action;
      return Object.assign({}, state, {
        randomMeal: state.randomMeal,
        foodItems: state.foodItems,
        loadingRandomMeal: true,
        loadingAllItems: false
      });

    case HomeActions.LOAD_RANDOM_MEAL_SUCCESS:
      const loadRandomMealSuccessAction = <HomeActions.LoadRandomMealSuccessAction>action;
      return Object.assign({}, state, {
        randomMeal: loadRandomMealSuccessAction.foodItems,
        foodItems: state.foodItems,
        loadingRandomMeal: false,
        loadingAllItems: false
      });

    default:
      return state;

  }
}

