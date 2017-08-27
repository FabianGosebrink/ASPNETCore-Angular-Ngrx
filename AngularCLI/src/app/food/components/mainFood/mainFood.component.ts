import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import {
    ADD_FOOD,
    createActionOfType,
    DELETE_FOOD,
    LOAD_FOOD,
    SELECT_FOOD,
    UPDATE_FOOD,
} from '../../store/actions/food.actions';
import { FoodState } from '../../store/reducer/food.reducer';
import { FoodItem } from './../../../shared/models/foodItem.model';

@Component({
    selector: 'app-main-food-component',
    templateUrl: './mainFood.component.html'
})

export class MainFoodComponent implements OnInit {
    selectedItem: Observable<FoodState>;
    foodState: Observable<FoodState>;

    constructor(private store: Store<any>) {
        this.foodState = this.store.select(state => state.food.foodItems);
        this.selectedItem = this.store.select(state => state.food.selectedItem);
    }

    ngOnInit() {
        this.store.dispatch(createActionOfType(LOAD_FOOD));
    }

    setCurrentlySelectedFood(foodItem: FoodItem) {
        this.store.dispatch(createActionOfType(SELECT_FOOD, foodItem));
    }

    addFood(foodItem: FoodItem) {
        this.store.dispatch(createActionOfType(ADD_FOOD, foodItem));
    }

    updateFood(foodItem: FoodItem) {
        this.store.dispatch(createActionOfType(UPDATE_FOOD, foodItem));
    }

    deleteFood(foodItem: FoodItem) {
        this.store.dispatch(createActionOfType(DELETE_FOOD, foodItem));
    }
}
