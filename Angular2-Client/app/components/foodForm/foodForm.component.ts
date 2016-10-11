import { Component, Input, OnInit } from '@angular/core';
import { FoodDataService } from '../../shared/food.dataservice';
import { FoodItem } from '../../models/foodItem';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'foodForm-component',
    templateUrl: 'app/components/foodForm/foodForm.component.html'
})

export class FoodFormComponent {
    @Input() foodItem: FoodItem;

    constructor(private _foodDataService: FoodDataService) {

    }

    get diagnostic() { return JSON.stringify(this.foodItem); }

    public AddOrUpdateFood = (): void => {
        if (this.foodItem.Id) {
            this.UpdateFood(this.foodItem);
        } else {
            this.AddFood(this.foodItem);
        }
    }

    private AddFood = (foodItem: FoodItem): void => {
        this._foodDataService
            .AddFood(this.foodItem)
            .subscribe((response: FoodItem) => {
                console.log("added food");
                this.foodItem = new FoodItem();
            },
            error => console.log(error));
    }

    private UpdateFood = (foodItem: FoodItem): void => {
        this._foodDataService
            .UpdateFood(this.foodItem.Id, this.foodItem)
            .subscribe((response: FoodItem) => {
                console.log("updated food");
                this.foodItem = new FoodItem();
            },
            error => console.log(error));
    }
}