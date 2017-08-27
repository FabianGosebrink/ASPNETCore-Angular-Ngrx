import { FoodItem } from '../../../shared/models/foodItem.model';
import {
    ADD_FOOD_SUCCESS,
    DELETE_FOOD_SUCCESS,
    FoodAction,
    LOAD_FOOD_SUCCESS,
    SELECT_FOOD,
    UPDATE_FOOD_SUCCESS,
} from '../actions/food.actions';

export interface FoodState {
    foodItems: FoodItem[],
    selectedItem: FoodItem
};

export const initialState: FoodState = {
    foodItems: [],
    selectedItem: new FoodItem()
};

export function foodItemsReducer(state = initialState, action: FoodAction<FoodItem[] | FoodItem>): FoodState {
    switch (action.type) {

        case ADD_FOOD_SUCCESS:
            return {
                ...state,
                foodItems: state.foodItems.concat(action.payload)
            };

        case DELETE_FOOD_SUCCESS:
            const foodItemToDelete = <FoodItem>action.payload;
            return {
                ...state,
                foodItems: state.foodItems.filter(item => item.id !== foodItemToDelete.id)
            };

        case UPDATE_FOOD_SUCCESS:
            const foodItemToUpdate = <FoodItem>action.payload;

            return {
                ...state,
                foodItems: state.foodItems.map((item: FoodItem) => {
                    return item.id === foodItemToUpdate.id ? Object.assign({}, item, foodItemToUpdate) : item;
                }),
                selectedItem: new FoodItem()
            };

        case LOAD_FOOD_SUCCESS:
            return {
                ...state,
                foodItems: <FoodItem[]>action.payload,
                selectedItem: new FoodItem()
            };

        default:
            return state;

    }
}

export function selectedItemReducer(state = initialState, action: FoodAction<FoodItem>): FoodState {
    switch (action.type) {

        case SELECT_FOOD:
            return {
                ...state,
                foodItems: state.foodItems,
                selectedItem: action.payload
            };

        default:
            return state;

    }
}
