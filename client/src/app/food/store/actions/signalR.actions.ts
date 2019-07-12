import { createAction, props } from '@ngrx/store';
import { FoodItem } from '@app/shared/models/foodItem.model';
import { Ingredient } from '@app/shared/models/ingredient.model';

export const receivedFoodAdded = createAction(
  '[SignalR] RECEIVED_FOOD_ADDED',
  props<{ payload: FoodItem }>()
);

export const receivedIngredientAdded = createAction(
  '[SignalR] RECEIVED_INGREDIENT_ADDED',
  props<{ payload: Ingredient }>()
);

export const receivedIngredientDeleted = createAction(
  '[SignalR] RECEIVED_INGREDIENT_DELETED',
  props<{ payload: string }>()
);

export const receiveFoodUpdated = createAction(
  '[SignalR] RECEIVED_FOOD_UPDATED',
  props<{ payload: FoodItem }>()
);

export const receiveFoodDeleted = createAction(
  '[SignalR] RECEIVED_FOOD_DELETED',
  props<{ payload: string }>()
);
