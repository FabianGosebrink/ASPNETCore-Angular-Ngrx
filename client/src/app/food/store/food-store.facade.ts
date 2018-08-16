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
    this.store.dispatch(new fromActions.LoadFoodAction());
  }

  loadAllIngredients(foodId: string) {
    this.store.dispatch(new fromActions.LoadIngredientsAction(foodId));
  }

  addFood(foodItem: FoodItem) {
    this.store.dispatch(new fromActions.AddFoodAction(foodItem));
  }

  addIngredient(ingredient: Ingredient, foodId: string) {
    this.store.dispatch(
      new fromActions.AddIngredientAction(ingredient, foodId)
    );
  }

  updateFood(foodItem: FoodItem) {
    this.store.dispatch(new fromActions.UpdateFoodAction(foodItem));
  }

  deleteFood(foodItem: FoodItem) {
    this.store.dispatch(new fromActions.DeleteFoodAction(foodItem));
  }

  deleteIngredient(ingredient: Ingredient, foodId: string) {
    this.store.dispatch(
      new fromActions.DeleteIngredientAction(ingredient, foodId)
    );
  }

  receivedFoodData(data: any) {
    this.store.dispatch(new fromActions.ReceivedFoodAddedAction(data));
  }

  receivedFoodDeleted(data: any) {
    this.store.dispatch(new fromActions.ReceivedFoodDeletedAction(data));
  }

  receivedFoodUpdated(data: any) {
    this.store.dispatch(new fromActions.ReceivedFoodUpdatedAction(data));
  }

  receivedIngredientAdded(ingredient: Ingredient) {
    this.store.dispatch(
      new fromActions.ReceivedIngredientAddedAction(ingredient)
    );
  }

  receivedIngredientDeleted(ingredientId: string) {
    this.store.dispatch(
      new fromActions.ReceivedIngredientDeletedAction(ingredientId)
    );
  }
}
