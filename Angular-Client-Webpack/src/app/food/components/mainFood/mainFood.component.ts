import { FoodDataService } from './../../../shared/services/food-data.service';
import { FoodItem } from './../../../shared/models/foodItem.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'mainFood-component',
    templateUrl: './mainFood.component.html'
})

export class MainFoodComponent implements OnInit {
    public foodSelectedFromList: FoodItem;
    public foods: Observable<FoodItem[]>;

    constructor(private _foodDataService: FoodDataService) {
        this.resetCurrentlySelectedFoodItem();
    }

    ngOnInit() {
        this.getFood();
    }

    public setCurrentlySelectedFood(foodItem: FoodItem) {
        this.foodSelectedFromList = foodItem;
    }

    public addFood = (foodItem: FoodItem): void => {
        this._foodDataService
            .AddFood(foodItem)
            .subscribe((response: FoodItem) => {
                console.log('added food');
                this.resetCurrentlySelectedFoodItem();
                this.getFood();
            },
            error => console.log(error));
    }

    public updateFood = (foodItem: FoodItem): void => {
        this._foodDataService
            .UpdateFood(foodItem.id, foodItem)
            .subscribe((response: FoodItem) => {
                this.resetCurrentlySelectedFoodItem();
                this.getFood();
            },
            error => console.log(error));
    }

    public deleteFood(foodItem: FoodItem) {
        this._foodDataService
            .DeleteFood(foodItem.id)
            .subscribe(() => {
                console.log('Food deleted');
                this.getFood();
            },
            error => console.log(error));
    }

    private getFood = (): void => {
        this.foods = this._foodDataService.GetAllFood();
    }

    private resetCurrentlySelectedFoodItem() {
        this.setCurrentlySelectedFood(new FoodItem());
    }
}
