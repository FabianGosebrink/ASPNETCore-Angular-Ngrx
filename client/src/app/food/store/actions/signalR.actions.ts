import { Action } from '@ngrx/store';

import { FoodItem } from '../../../shared/models/foodItem.model';

export const RECEIVED_FOOD_ADDED = '[SignalR] RECEIVED_FOOD_ADDED';
export const RECEIVED_FOOD_UPDATED = '[SignalR] RECEIVED_FOOD_UPDATED';
export const RECEIVED_FOOD_DELETED = '[SignalR] RECEIVED_FOOD_DELETED';

export class ReceivedFoodAddedAction implements Action {
  readonly type = RECEIVED_FOOD_ADDED;
  constructor(public foodItem: FoodItem) {}
}

export class ReceivedFoodUpdatedAction implements Action {
  readonly type = RECEIVED_FOOD_UPDATED;
  constructor(public foodItem: any) {}
}

export class ReceivedFoodDeletedAction implements Action {
  readonly type = RECEIVED_FOOD_DELETED;
  constructor(public foodId: number) {}
}

export type SignalRActions =
  | ReceivedFoodAddedAction
  | ReceivedFoodUpdatedAction
  | ReceivedFoodDeletedAction;
