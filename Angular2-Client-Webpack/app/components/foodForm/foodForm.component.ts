import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FoodItem } from '../../models/foodItem';

@Component({
    selector: 'foodform',
    templateUrl: './foodForm.component.html'
})

export class FoodFormComponent implements OnChanges {
    @Input() foodItem: FoodItem;

    @Output() foodUpdated = new EventEmitter<FoodItem>();
    @Output() foodAdded = new EventEmitter<FoodItem>();

    public currentFood: FoodItem;

    constructor() {

    }

    ngOnChanges(changes: any) {
        this.currentFood = Object.assign(new FoodItem(), changes.foodItem.currentValue);
        console.log(this.currentFood);
    }

    public AddOrUpdateFood = (): void => {
        if (this.foodItem.id) {
            console.log('update');
            this.foodUpdated.emit(this.currentFood);
        } else {
            console.log('add');
            this.foodAdded.emit(this.currentFood);
        }
    }
}
