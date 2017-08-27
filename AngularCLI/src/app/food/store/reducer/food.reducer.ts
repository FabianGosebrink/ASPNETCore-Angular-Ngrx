import { FoodItem } from '../../../shared/models/foodItem.model';
import { ADD_FOOD, DELETE_FOOD, FoodAction, LOAD_FOOD, LOAD_FOOD_SUCCESS, UPDATE_FOOD } from '../actions/food.actions';

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

        case ADD_FOOD:
            return {
                ...state,
                foodItems: state.foodItems.concat(action.payload)
            };

        case DELETE_FOOD:
            const foodItemToDelete = <FoodItem>action.payload;
            return {
                ...state,
                foodItems: state.foodItems.filter(item => item.id !== foodItemToDelete.id)
            };

        case UPDATE_FOOD:
            const foodItemToUpdate = <FoodItem>action.payload;
            return {
                ...state,
                foodItems: state.foodItems.map((item: FoodItem) => {
                    return item.id === foodItemToUpdate.id ? Object.assign({}, item, foodItemToUpdate) : item;
                })
            };

        case LOAD_FOOD:
            return { ...state, foodItems: [] };

        case LOAD_FOOD_SUCCESS:
            return {
                ...state,
                foodItems: state.foodItems.concat(action.payload)
            };

        default:
            return state;
    }
}
