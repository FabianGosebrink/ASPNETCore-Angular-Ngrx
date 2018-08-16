import { FoodItem } from '../../../shared/models/foodItem.model';
import { AddFoodSuccessAction } from '../actions';
import { foodItemsReducer, FoodState } from './food.reducer';

describe('FoodList', () => {
  it('should return an array with the new food added to it', () => {
    const initialState: FoodState = {
      entities: { ['A']: new FoodItem(), ['B']: new FoodItem() },
      loaded: false,
      loading: false,
    };

    const foodItemToAdd = new FoodItem();

    foodItemToAdd.id = 'test';

    const addAction = new AddFoodSuccessAction(foodItemToAdd);

    const newState = foodItemsReducer(initialState, addAction);

    expect(newState.entities['test']).toBeDefined();
  });
});
