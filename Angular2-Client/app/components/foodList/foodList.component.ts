import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FoodDataService } from '../../shared/food.dataservice';
import { FoodItem } from '../../models/foodItem';

@Component({
    selector: 'foodList',
    templateUrl: 'app/components/foodList/foodList.component.html'
})

export class FoodListComponent {
    public foodItem: FoodItem;

    @Input() foods: FoodItem[];
    @Output() foodSelected = new EventEmitter<FoodItem>();
    @Output() foodDeleted = new EventEmitter<FoodItem>();

    public setFoodItemForEdit = (foodItem: FoodItem): void => {
        this.foodSelected.emit(foodItem);
    }

    public deleteFood = (foodItem: FoodItem): void => {
        this.foodDeleted.emit(foodItem);
    };
}