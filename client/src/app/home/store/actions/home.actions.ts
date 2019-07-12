import { createAction, props } from '@ngrx/store';
import { ModelDescriptor } from '@app/shared/models/model.descriptor';
import { FoodItem } from '@app/shared/models/foodItem.model';

export const loadRandomMeal = createAction('[Home] LOAD_RANDOM_MEAL');

export const loadRandomMealSuccess = createAction(
  '[Home] LOAD_RANDOM_MEAL_SUCCESS',
  props<{ payload: ModelDescriptor<FoodItem[]> }>()
);

export const loadRandomMealError = createAction(
  '[Home] LOAD_RANDOM_MEAL_SUCCESS_ERROR',
  props<{ payload: any }>()
);
