import { FoodItem } from '../../../shared/models/foodItem.model';
import { ADD_FOOD, DELETE_FOOD, FOOD_LOADED, FoodAction, LOAD_FOOD } from '../actions/food.actions';

export function foodReducer(state: FoodItem[] = [], action: FoodAction<FoodItem>) {
    switch (action.type) {

        case ADD_FOOD:
            return [action.payload, ...state];

        case DELETE_FOOD:
            return state.filter((item) => item.id !== action.payload.id);

        case FOOD_LOADED:
            return action.payload;

        case LOAD_FOOD:
            console.log('LOAD_FOOD');
            return state;

        default:
            return state;
    }
}
