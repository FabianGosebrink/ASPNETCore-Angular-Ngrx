import { Action } from '@ngrx/store';
import * as ingredientActions from '../actions/ingredients.actions';
import * as signalrActions from '../actions/signalR.actions';
import { Ingredient } from '../../../shared/models/ingredient.model';

export interface IngredientState {
  entities: { [id: string]: Ingredient };
  loaded: boolean;
  loading: boolean;
}

export const initialState: IngredientState = {
  entities: {},
  loaded: false,
  loading: false
};

export function ingredientsReducer(
  state = initialState,
  action: ingredientActions.IngredientsActions | signalrActions.SignalRActions
): IngredientState {
  switch (action.type) {
    case signalrActions.RECEIVED_INGREDIENT_ADDED: {
      if (!!state.entities[action.payload.id]) {
        return state;
      }

      const ingredient = action.payload;
      const entities = {
        ...state.entities,
        [ingredient.id]: ingredient
      };

      return {
        ...state,
        entities
      };
    }

    case signalrActions.RECEIVED_INGREDIENT_DELETED: {
      if (!state.entities[action.ingredientId]) {
        return state;
      }

      const { [action.ingredientId]: removed, ...entities } = state.entities;

      return {
        ...state,
        entities
      };
    }

    case ingredientActions.ADD_INGREDIENT_SUCCESS: {
      const ingredient = action.payload;

      const entities = {
        ...state.entities,
        [ingredient.id]: ingredient
      };

      return {
        ...state,
        entities
      };
    }

    case ingredientActions.DELETE_INGREDIENT_SUCCESS: {
      const ingredient = action.payload;
      const { [ingredient.id]: removed, ...entities } = state.entities;

      return {
        ...state,
        entities
      };
    }

    case ingredientActions.LOAD_INGREDIENTS_SUCCESS: {
      const payload = action.payload;

      const entities: { [id: string]: Ingredient } = {};

      for (const entity of payload) {
        entities[entity.id] = entity;
      }
      return {
        ...state,
        entities,
        loaded: true
      };
    }

    default:
      return state;
  }
}

export const getIngredientItemEntities = (state: IngredientState) =>
  state.entities;
export const getIngredientsLoaded = (state: IngredientState) => state.loaded;
export const getIngredientsLoading = (state: IngredientState) => state.loading;
