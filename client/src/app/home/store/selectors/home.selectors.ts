import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromHome from '../reducers/home.reducer';

export const getCompleteHomeState = createSelector(
  fromFeature.getHomeState,
  (state: fromFeature.HomeState) => state.home
);

const getRandomMealState = createSelector(
  getCompleteHomeState,
  fromHome.getRandomMeal
);

export const getRandomMeal = createSelector(getRandomMealState, entities => {
  return Object.keys(entities).map(id => entities[id]);
});

export const getLoading = createSelector(
  getCompleteHomeState,
  fromHome.getRandomMealLoading
);

export const getLoaded = createSelector(
  getCompleteHomeState,
  fromHome.getRandomMealLoaded
);
