import { FoodItem } from '../../../shared/models/foodItem.model';
import { addFood } from '../actions';
import { foodReducer, FoodReducerState } from './food.reducer';

describe('FoodList', () => {
  it('should return an array with the new food added to it', () => {
    const initialState: FoodReducerState = {
      entities: { ['A']: new FoodItem(), ['B']: new FoodItem() },
      loaded: false,
      loading: false
    };

    const foodItemToAdd = new FoodItem();

    foodItemToAdd.id = 'test';

    const newState = foodReducer(
      initialState,
      addFood({ payload: foodItemToAdd })
    );

    expect(newState.entities['test']).toBeDefined();
  });
});
