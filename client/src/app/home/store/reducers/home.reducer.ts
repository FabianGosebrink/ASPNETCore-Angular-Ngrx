import * as homeActions from '../actions/home.actions';
import { on, createReducer, Action } from '@ngrx/store';
import { FoodItem } from '@app/shared/models/foodItem.model';

export interface HomeReduerState {
  randomMeal: { [id: string]: FoodItem };
  loading: boolean;
  loaded: boolean;
}

export const initialState: HomeReduerState = {
  randomMeal: {},
  loading: false,
  loaded: false
};

const homeReducerInternal = createReducer(
  initialState,
  on(homeActions.loadRandomMeal, (state, {}) => {
    return {
      ...state,
      loading: true
    };
  }),

  on(homeActions.loadRandomMealSuccess, (state, { payload }) => {
    const values = payload.value;
    const randomMeal: { [id: string]: FoodItem } = {};
    values.forEach((item: FoodItem) => {
      if (item) {
        randomMeal[item.id] = item;
      } else {
        randomMeal[''] = null;
      }
    });

    return {
      ...state,
      randomMeal,
      loaded: true,
      loading: false
    };
  })
);

export function homeReducer(
  state: HomeReduerState | undefined,
  action: Action
) {
  return homeReducerInternal(state, action);
}

export const getRandomMeal = (state: HomeReduerState) => state.randomMeal;
export const getRandomMealLoaded = (state: HomeReduerState) => state.loaded;
export const getRandomMealLoading = (state: HomeReduerState) => state.loading;
