import { FoodItem } from '../../../shared/models/foodItem.model';
import * as foodActions from '../actions/food.actions';
import * as signalrActions from '../actions/signalR.actions';
import { Action, createReducer, on } from '@ngrx/store';

export interface FoodReducerState {
  entities: { [id: string]: FoodItem };
  loaded: boolean;
  loading: boolean;
}

export const initialState: FoodReducerState = {
  entities: {},
  loaded: false,
  loading: false
};

const foodReducerInternal = createReducer(
  initialState,
  on(
    foodActions.addFoodSuccess,
    foodActions.updateFoodSuccess,
    (state, { payload }) => {
      const entities = {
        ...state.entities,
        [payload.id]: payload
      };

      return {
        ...state,
        entities
      };
    }
  ),
  on(foodActions.loadFoodSuccess, (state, { payload }) => {
    const entities: { [id: string]: FoodItem } = {};

    for (const entity of payload.value) {
      entities[entity.id] = entity;
    }

    return {
      ...state,
      entities,
      loaded: true
    };
  }),

  on(foodActions.deleteFoodSuccess, (state, { payload }) => {
    const foodItem = payload;
    const { [foodItem.id]: removed, ...entities } = state.entities;

    return {
      ...state,
      entities
    };
  }),

  on(signalrActions.receivedFoodAdded, (state, { payload }) => {
    if (!!state.entities[payload.id]) {
      return state;
    }

    const foodItem = payload;
    const entities = {
      ...state.entities,
      [foodItem.id]: foodItem
    };

    return {
      ...state,
      entities
    };
  }),

  on(signalrActions.receiveFoodDeleted, (state, { payload }) => {
    if (!state.entities[payload]) {
      return state;
    }

    const { [payload]: removed, ...entities } = state.entities;

    return {
      ...state,
      entities
    };
  }),

  on(signalrActions.receiveFoodUpdated, (state, { payload }) => {
    const foodItem = payload;

    const entities = {
      ...state.entities,
      [foodItem.id]: foodItem
    };

    return {
      ...state,
      entities
    };
  })
);

export function foodReducer(
  state: FoodReducerState | undefined,
  action: Action
) {
  return foodReducerInternal(state, action);
}

export const getFoodItemEntities = (state: FoodReducerState) => state.entities;
export const getFoodItemsLoaded = (state: FoodReducerState) => state.loaded;
export const getFoodItemsLoading = (state: FoodReducerState) => state.loading;
