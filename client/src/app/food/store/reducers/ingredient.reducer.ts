import { Ingredient } from '../../../shared/models/ingredient.model';
import * as ingredientActions from '../actions/ingredients.actions';
import * as signalrActions from '../actions/signalR.actions';
import { Action, createReducer, on } from '@ngrx/store';

export interface IngredientReducerState {
  entities: { [id: string]: Ingredient };
  loaded: boolean;
  loading: boolean;
}

export const initialState: IngredientReducerState = {
  entities: {},
  loaded: false,
  loading: false
};

const ingredientsReducerinternal = createReducer(
  initialState,
  on(signalrActions.receivedIngredientAdded, (state, { payload }) => {
    if (!!state.entities[payload.id]) {
      return state;
    }

    const ingredient = payload;
    const entities = {
      ...state.entities,
      [ingredient.id]: ingredient
    };

    return {
      ...state,
      entities
    };
  }),

  on(signalrActions.receivedIngredientDeleted, (state, { payload }) => {
    if (!state.entities[payload]) {
      return state;
    }

    const { [payload]: removed, ...entities } = state.entities;

    return {
      ...state,
      entities
    };
  }),

  on(ingredientActions.addIngredientSuccess, (state, { payload }) => {
    const ingredient = payload;

    const entities = {
      ...state.entities,
      [ingredient.id]: ingredient
    };

    return {
      ...state,
      entities
    };
  }),

  on(ingredientActions.deleteIngredientSuccess, (state, { payload }) => {
    const ingredient = payload;
    const { [ingredient.id]: removed, ...entities } = state.entities;

    return {
      ...state,
      entities
    };
  }),

  on(ingredientActions.loadIngredientsSuccess, (state, { payload }) => {
    const entities: { [id: string]: Ingredient } = {};

    for (const entity of payload) {
      entities[entity.id] = entity;
    }
    return {
      ...state,
      entities,
      loaded: true
    };
  })
);

export const getIngredientItemEntities = (state: IngredientReducerState) =>
  state.entities;
export const getIngredientsLoaded = (state: IngredientReducerState) =>
  state.loaded;
export const getIngredientsLoading = (state: IngredientReducerState) =>
  state.loading;

export function ingredientReducer(
  state: IngredientReducerState | undefined,
  action: Action
) {
  return ingredientsReducerinternal(state, action);
}
