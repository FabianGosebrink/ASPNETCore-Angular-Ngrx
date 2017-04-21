import { FoodItem } from './../../../shared/models/foodItem.model';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Sorter } from '../../../core/services/sort.service';

@Component({
    selector: 'foodlist',
    templateUrl: './foodList.component.html'
})

export class FoodListComponent {
    foodItem: FoodItem;
    foodToDelete: FoodItem;
    searchString: string;

    @Input() foods: FoodItem[];
    @Output() foodSelected = new EventEmitter<FoodItem>();
    @Output() foodDeleted = new EventEmitter<FoodItem>();

    constructor(private sorter: Sorter) { }

    setFoodToDelete = (foodItem: FoodItem): void => {
        this.foodToDelete = foodItem;
    }

    sortArray(key: string, $event: any) {
        if ($event) {
            $event.preventDefault();
        }
        this.sorter.sort(key, this.foods);
    }
}
