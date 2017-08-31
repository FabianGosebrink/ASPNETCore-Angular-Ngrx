import { FoodItem } from '../../../shared/models/foodItem.model';
import * as FoodActions from '../actions/food.actions';

export interface FoodState {
    foodItems: FoodItem[],
    selectedItem: FoodItem
};

export const initialState: FoodState = {
    foodItems: [],
    selectedItem: new FoodItem()
};

export function foodItemsReducer(state = initialState, action: any): FoodState {
    switch (action.type) {

        case FoodActions.ADD_FOOD_SUCCESS:
            const addFoodAction = <FoodActions.AddFoodSuccessAction>action;
            return {
                ...state,
                foodItems: state.foodItems.concat(addFoodAction.foodItem)
            };

        case FoodActions.DELETE_FOOD_SUCCESS:
            const deleteFoodAction = <FoodActions.DeleteFoodSuccessAction>action;
            return {
                ...state,
                foodItems: state.foodItems.filter(item => item.id !== deleteFoodAction.foodItem.id)
            };

        case FoodActions.UPDATE_FOOD_SUCCESS:
            const updateFoodAction = <FoodActions.UpdateFoodSuccessAction>action;
            return {
                ...state,
                foodItems: state.foodItems.map((item: FoodItem) => {
                    return item.id === updateFoodAction.foodItem.id ? Object.assign({}, item, updateFoodAction.foodItem) : item;
                }),
                selectedItem: new FoodItem()
            };

        case FoodActions.LOAD_FOOD_SUCCESS:
            const loadFoodAction = <FoodActions.LoadFoodSuccessAction>action;
            return {
                ...state,
                foodItems: loadFoodAction.foodItems,
                selectedItem: new FoodItem()
            };

        default:
            return state;

    }
}

export function selectedItemReducer(state = initialState, action: any): FoodState {
    switch (action.type) {

        case FoodActions.SELECT_FOOD_SUCCESS:
            const selectFoodAction = <FoodActions.SelectFoodSuccessAction>action;
            return {
                ...state,
                foodItems: state.foodItems,
                selectedItem: selectFoodAction.foodItem
            };

        default:
            return state;

    }
}
