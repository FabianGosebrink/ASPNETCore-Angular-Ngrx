import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { FoodItem } from './../../../shared/models/foodItem.model';

@Component({
    selector: 'app-food-form-component',
    templateUrl: './foodForm.component.html'
})

export class FoodFormComponent {

    types: string[] = ['Starter', 'Main', 'Dessert'];
    @Input() foodItem: FoodItem;
    @Output() foodUpdated = new EventEmitter<FoodItem>();
    @Output() foodAdded = new EventEmitter<FoodItem>();

    currentFood: FoodItem = new FoodItem();

    addOrUpdateFood() {
        const copy = Object.assign(new FoodItem(), this.currentFood);
        this.foodItem.id ? this.foodUpdated.emit(copy) : this.foodAdded.emit(copy);
    }
}
