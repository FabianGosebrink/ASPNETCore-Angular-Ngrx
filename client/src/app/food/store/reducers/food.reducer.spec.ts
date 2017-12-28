import { ADD_FOOD } from '../actions/food.actions';
import { FoodItem } from '../../../shared/models/foodItem.model';
import { foodItemsReducer, FoodState } from './food.reducer';

describe('FoodList', () => {
    it('should return an array with the new food added to it', () => {
        const newFood = { id: 3, name: 'New Guy' };

        const initialState: FoodState = {
            foodItems: [new FoodItem(), new FoodItem()],
            selectedItem: new FoodItem()
        };

        const foodItemToAdd = new FoodItem();

        foodItemToAdd.id = 'test';

        const addAction = { type: ADD_FOOD, payload: foodItemToAdd }

        const newState = foodItemsReducer(initialState, addAction);

        expect(newState.foodItems.length).toBe(3);
    });
});
