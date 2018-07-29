import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FoodItem } from '../../../shared/models/foodItem.model';
import * as fromStore from '../../store';

@Component({
  selector: 'app-main-food-component',
  templateUrl: './main-food.component.html'
})
export class MainFoodComponent implements OnInit {
  foods$: Observable<FoodItem[]>;
  selectedItem: FoodItem;

  constructor(private store: Store<fromStore.FoodState>) {}

  ngOnInit() {
    this.foods$ = this.store.select(fromStore.getAllFoods);
    this.store.dispatch(new fromStore.LoadFoodAction());
  }

  setCurrentlySelectedFood(foodItem: FoodItem) {
    this.selectedItem = foodItem;
  }

  addFood(foodItem: FoodItem) {
    this.store.dispatch(new fromStore.AddFoodAction(foodItem));
    this.selectedItem = null;
  }

  updateFood(foodItem: FoodItem) {
    this.store.dispatch(new fromStore.UpdateFoodAction(foodItem));
    this.selectedItem = null;
  }

  deleteFood(foodItem: FoodItem) {
    this.store.dispatch(new fromStore.DeleteFoodAction(foodItem));
  }
}
