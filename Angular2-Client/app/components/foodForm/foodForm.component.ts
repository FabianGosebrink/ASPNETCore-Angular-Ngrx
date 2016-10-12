import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { FoodDataService } from '../../shared/food.dataservice';
import { FoodItem } from '../../models/foodItem';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'foodForm',
    templateUrl: 'app/components/foodForm/foodForm.component.html'
})

export class FoodFormComponent implements OnChanges {
    @Input() foodItem: FoodItem;

    @Output() foodUpdated = new EventEmitter<FoodItem>();
    @Output() foodAdded = new EventEmitter<FoodItem>();

    private currentFood: FoodItem;

    constructor() {

    }

    ngOnChanges(changes: any) {
        this.currentFood = Object.assign(new FoodItem(), changes.foodItem.currentValue);
        console.log(this.currentFood);
    }

    public AddOrUpdateFood = (): void => {
        if (this.foodItem.id) {
            console.log("update");
            this.foodUpdated.emit(this.currentFood);
        } else {
            console.log("add");
            this.foodAdded.emit(this.currentFood);
        }
    }
}