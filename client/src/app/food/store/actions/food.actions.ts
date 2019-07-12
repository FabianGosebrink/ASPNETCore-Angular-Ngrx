import { createAction, props } from '@ngrx/store';
import { FoodItem } from '@app/shared/models/foodItem.model';
import { ModelDescriptor } from '@app/shared/models/model.descriptor';

export const addFood = createAction(
  '[Foods] ADD_FOOD',
  props<{ payload: FoodItem }>()
);

export const addFoodSuccess = createAction(
  '[Foods] ADD_FOOD_SUCCESS',
  props<{ payload: FoodItem }>()
);

export const loadFood = createAction('[Foods] LOAD_FOOD');

export const loadFoodSuccess = createAction(
  '[Foods] LOAD_FOOD_SUCCESS',
  props<{ payload: ModelDescriptor<FoodItem[]> }>()
);

export const deleteFood = createAction(
  '[Foods] DELETE_FOOD',
  props<{ payload: FoodItem }>()
);

export const deleteFoodSuccess = createAction(
  '[Foods] DELETE_FOOD_SUCCESS',
  props<{ payload: any }>()
);

export const updateFood = createAction(
  '[Foods] UPDATE_FOOD',
  props<{ payload: FoodItem }>()
);

export const updateFoodSuccess = createAction(
  '[Foods] UPDATE_FOOD_SUCCESS',
  props<{ payload: FoodItem }>()
);

export const foodError = createAction(
  '[Foods] FOOD_ERROR',
  props<{ payload: any }>()
);
