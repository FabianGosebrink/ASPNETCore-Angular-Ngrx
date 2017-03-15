import { FoodItem } from './../../../shared/models/foodItem.model';
import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';


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

    ngOnChanges(changes: SimpleChanges) {
        this.currentFood = Object.assign(new FoodItem(), changes['foodItem'].currentValue);
    }

    public AddOrUpdateFood = (): void => {
        if (this.foodItem.id) {
            this.foodUpdated.emit(this.currentFood);
        } else {
            this.foodAdded.emit(this.currentFood);
        }
    }
}
