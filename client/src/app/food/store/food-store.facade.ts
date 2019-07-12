import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FoodItem } from '../../shared/models/foodItem.model';
import { Ingredient } from '../../shared/models/ingredient.model';
import * as fromActions from './actions';
import * as fromReducers from './reducers';
import * as fromSelectors from './selectors';

@Injectable({ providedIn: 'root' })
export class FoodStoreFacade {
  foodItemsLoaded$ = this.store.pipe(select(fromSelectors.getFoodItemsLoaded));
  allFoods$ = this.store.pipe(select(fromSelectors.getAllFoods));
  selectedFood$ = this.store.pipe(select(fromSelectors.getSelectedFood));
  ingredients$ = this.store.pipe(select(fromSelectors.getAllIngredients));

  constructor(private store: Store<fromReducers.FoodState>) {}

  loadAllFoods() {
    this.store.dispatch(fromActions.loadFood());
  }

  loadAllIngredients(payload: string) {
    this.store.dispatch(fromActions.loadIngredients({ payload }));
  }

  addFood(payload: FoodItem) {
    this.store.dispatch(fromActions.addFood({ payload }));
  }

  addIngredient(ingredient: Ingredient, foodId: string) {
    this.store.dispatch(
      fromActions.addIngredient({ payload: ingredient, foodId })
    );
  }

  updateFood(payload: FoodItem) {
    this.store.dispatch(fromActions.updateFood({ payload }));
  }

  deleteFood(payload: FoodItem) {
    this.store.dispatch(fromActions.deleteFood({ payload }));
  }

  deleteIngredient(ingredient: Ingredient, foodId: string) {
    this.store.dispatch(
      fromActions.deleteIngredient({ payload: ingredient, foodId })
    );
  }

  receivedFoodData(data: any) {
    this.store.dispatch(fromActions.receivedFoodAdded({ payload: data }));
  }

  receivedFoodDeleted(data: any) {
    this.store.dispatch(fromActions.receiveFoodDeleted({ payload: data }));
  }

  receivedFoodUpdated(data: any) {
    this.store.dispatch(fromActions.receiveFoodUpdated({ payload: data }));
  }

  receivedIngredientAdded(payload: Ingredient) {
    this.store.dispatch(fromActions.receivedIngredientAdded({ payload }));
  }

  receivedIngredientDeleted(payload: string) {
    this.store.dispatch(fromActions.receivedIngredientDeleted({ payload }));
  }
}
