import { createSelector } from '@ngrx/store';

import * as fromAppRoot from '../../../store';
import * as fromFeature from '../reducers';
import * as fromIngredient from '../reducers/ingredient.reducer';
import { Ingredient } from '../../../shared/models/ingredient.model';

export const getCompleteIngredientState = createSelector(
  fromFeature.getFoodState,
  (state: fromFeature.FoodState) => state.ingredients
);

export const getAllIngredientEntities = createSelector(
  getCompleteIngredientState,
  fromIngredient.getIngredientItemEntities
);

export const getIngredientsLoaded = createSelector(
  getCompleteIngredientState,
  fromIngredient.getIngredientsLoaded
);

export const getAllIngredients = createSelector(
  getAllIngredientEntities,
  entities => {
    return Object.keys(entities).map(id => entities[id]);
  }
);
