import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodItem } from '../../../shared/models/foodItem.model';
import { FoodStoreFacade } from '../../store/food-store.facade';

@Component({
  selector: 'app-main-food-component',
  templateUrl: './main-food.component.html'
})
export class MainFoodComponent implements OnInit {
  foods$: Observable<FoodItem[]>;
  selectedItem: FoodItem;

  constructor(private facade: FoodStoreFacade) {}

  ngOnInit() {
    this.foods$ = this.facade.allFoods$;
    this.facade.loadAllFoods();
  }

  setCurrentlySelectedFood(foodItem: FoodItem) {
    this.selectedItem = foodItem;
  }

  addFood(foodItem: FoodItem) {
    this.facade.addFood(foodItem);
    this.selectedItem = null;
  }

  updateFood(foodItem: FoodItem) {
    this.facade.updateFood(foodItem);
    this.selectedItem = null;
  }

  deleteFood(foodItem: FoodItem) {
    this.facade.deleteFood(foodItem);
  }
}
