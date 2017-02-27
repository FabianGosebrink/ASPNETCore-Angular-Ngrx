import { FoodItem } from './../../../shared/models/foodItem';
import { Sorter } from './../../../shared/services/sort.service';
import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'foodlist',
    templateUrl: './foodList.component.html'
})

export class FoodListComponent {
    public foodItem: FoodItem;
    public foodToDelete: FoodItem;
    public searchString: string;

    @Input() foods: FoodItem[];
    @Output() foodSelected = new EventEmitter<FoodItem>();
    @Output() foodDeleted = new EventEmitter<FoodItem>();

    constructor(private sorter: Sorter) { }

    public setFoodItemForEdit = (foodItem: FoodItem): void => {
        this.foodSelected.emit(foodItem);
    }

    public deleteFood = (foodItem: FoodItem): void => {
        this.foodDeleted.emit(foodItem);
    }

    public setFoodToDelete = (foodItem: FoodItem): void => {
        this.foodToDelete = foodItem;
    }

    public sortArray(key: string) {
        this.sorter.sort(key, this.foods);
    }
}
