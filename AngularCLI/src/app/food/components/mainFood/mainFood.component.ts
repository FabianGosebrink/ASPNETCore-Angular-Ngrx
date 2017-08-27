import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { FoodDataService } from '../../../core/data-services/food-data.service';
import { AbstractNotificationService, MessageType } from '../../../core/services/notification.service';
import { ADD_FOOD, createActionOfType, DELETE_FOOD, LOAD_FOOD } from '../../store/actions/food.actions';
import { FoodState } from '../../store/reducer/food.reducer';
import { FoodItem } from './../../../shared/models/foodItem.model';

@Component({
    selector: 'app-main-food-component',
    templateUrl: './mainFood.component.html'
})

export class MainFoodComponent implements OnInit {
    foodSelectedFromList: FoodItem;
    foodState: Observable<FoodState>;

    constructor(private _foodDataService: FoodDataService,
        private notificationService: AbstractNotificationService,
        private store: Store<any>) {

        this.resetCurrentlySelectedFoodItem();

        this.foodState = this.store.select(state => state.food.foodItems);
    }

    ngOnInit() {
        this.store.dispatch(createActionOfType(LOAD_FOOD));
    }

    setCurrentlySelectedFood(foodItem: FoodItem) {
        this.foodSelectedFromList = foodItem;
    }

    addFood(foodItem: FoodItem) {
        this.store.dispatch(createActionOfType(ADD_FOOD, foodItem));
    }

    updateFood(foodItem: FoodItem) {
        this._foodDataService
            .updateFood(foodItem.id, foodItem)
            .subscribe((response: FoodItem) => {
                this.notificationService.showNotification(MessageType.Success, 'Food', 'Food updated!');
                this.resetCurrentlySelectedFoodItem();
                // this.getFood();
            },
            (error: any) => {
                console.log(error)
                this.notificationService.showNotification(MessageType.Error, 'Food', 'There was an error :(');
            });
    }

    deleteFood(foodItem: FoodItem) {
        this.store.dispatch(createActionOfType(DELETE_FOOD, foodItem));
    }

    private resetCurrentlySelectedFoodItem() {
        this.setCurrentlySelectedFood(new FoodItem());
    }
}
