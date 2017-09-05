import { Action } from '@ngrx/store';

import { FoodItem } from '../../../shared/models/foodItem.model';
import * as HomeActions from '../actions/home.actions';

export interface HomeState {
    foodItems: FoodItem[],
    randomMeal: FoodItem[],
    loading: boolean
};

export const initialState: HomeState = {
    foodItems: [],
    randomMeal: [],
    loading: false
};

export function foodItemsHomeReducer(state = initialState, action: Action): HomeState {
    switch (action.type) {

        case HomeActions.LOAD_FOOD_SUCCESS:
            const loadFoodAction = <HomeActions.LoadFoodSuccessAction>action;
            return Object.assign({}, state, {
                randomMeal: state.randomMeal,
                foodItems: loadFoodAction.foodItems,
                loading: false
            });

        case HomeActions.LOAD_RANDOM_MEAL:
            const loadRandomMealAction = <HomeActions.LoadRandomMealAction>action;
            return Object.assign({}, state, {
                randomMeal: state.randomMeal,
                foodItems: state.foodItems,
                loading: true
            });

        case HomeActions.LOAD_RANDOM_MEAL_SUCCESS:
            const loadRandomMealSuccessAction = <HomeActions.LoadRandomMealSuccessAction>action;
            return Object.assign({}, state, {
                randomMeal: loadRandomMealSuccessAction.foodItems,
                foodItems: state.foodItems,
                loading: false
            });

        default:
            return state;

    }
}

