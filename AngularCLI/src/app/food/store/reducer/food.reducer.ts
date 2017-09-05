import { Action } from '@ngrx/store';

import { FoodItem } from '../../../shared/models/foodItem.model';
import * as FoodActions from '../actions/food.actions';

export interface FoodState {
  foodItems: FoodItem[],
  selectedItem: FoodItem,
  detailedItem: FoodItem
};

export const initialState: FoodState = {
  foodItems: [],
  selectedItem: new FoodItem(),
  detailedItem: null
};

export function foodItemsReducer(state = initialState, action: Action): FoodState {
  switch (action.type) {

    case FoodActions.ADD_FOOD_SUCCESS:
      const addFoodAction = <FoodActions.AddFoodSuccessAction>action;
      return Object.assign({}, state, {
        foodItems: state.foodItems.concat(addFoodAction.foodItem),
        selectedItem: new FoodItem(),
        detailedItem: null
      });

    case FoodActions.DELETE_FOOD_SUCCESS:
      const deleteFoodAction = <FoodActions.DeleteFoodSuccessAction>action;
      return Object.assign({}, state, {
        foodItems: state.foodItems.filter(item => item.id !== deleteFoodAction.foodItem.id),
        selectedItem: new FoodItem(),
        detailedItem: null
      });

    case FoodActions.UPDATE_FOOD_SUCCESS:
      const updateFoodAction = <FoodActions.UpdateFoodSuccessAction>action;
      return Object.assign({}, state, {
        foodItems: state.foodItems.map((item: FoodItem) => {
          return item.id === updateFoodAction.foodItem.id ? Object.assign({}, item, updateFoodAction.foodItem) : item;
        }),
        selectedItem: new FoodItem(),
        detailedItem: null
      });

    case FoodActions.LOAD_FOOD_SUCCESS:
      const loadFoodAction = <FoodActions.LoadFoodSuccessAction>action;
      return Object.assign({}, state, {
        foodItems: loadFoodAction.foodItems,
        selectedItem: new FoodItem(),
        detailedItem: null
      });

    default:
      return state;

  }
}

export function selectedItemReducer(state = initialState, action: any): FoodState {
  switch (action.type) {

    case FoodActions.LOAD_FOOD:
      const loadFoodAction = <FoodActions.LoadFoodAction>action;

      return Object.assign({}, state, {
        foodItems: state.foodItems,
        selectedItem: new FoodItem(),
        detailedItem: null
      });

    case FoodActions.SELECT_FOOD_SUCCESS:
      const selectFoodAction = <FoodActions.SelectFoodSuccessAction>action;

      return Object.assign({}, state, {
        foodItems: state.foodItems,
        selectedItem: selectFoodAction.foodItem,
        detailedItem: null
      });

    case FoodActions.LOAD_SINGLE_FOOD_SUCCESS:
      const loadSingleFoodSuccessAction = <FoodActions.LoadSingleFoodSuccessAction>action;

      return Object.assign({}, state, {
        foodItems: state.foodItems,
        selectedItem: state.selectedItem,
        detailedItem: loadSingleFoodSuccessAction.foodItem
      });

    default:
      return state;

  }
}
