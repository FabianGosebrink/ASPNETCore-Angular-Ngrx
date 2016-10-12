import { Component, Input, OnInit } from '@angular/core';
import { FoodFormComponent } from '../foodForm/foodForm.component';
import { FoodListComponent } from '../foodList/foodList.component';
import { FoodDetailsComponent } from '../foodDetails/foodDetails.component';
import { FoodDataService } from '../../shared/food.dataservice';
import { FoodItem } from '../../models/foodItem';

@Component({
    selector: 'mainFood-component',
    templateUrl: 'app/components/mainFood/mainFood.component.html'
})

export class MainFoodComponent implements OnInit {
    public foodSelectedFromList: FoodItem;
    public foods: FoodItem[];

    constructor(private _foodDataService: FoodDataService) {
        this.setCurrentlySelectedFood(new FoodItem());
        this._foodDataService.foodAdded.subscribe(() => this.getFood());
        this._foodDataService.foodDeleted.subscribe(() => this.getFood());
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
                console.log("added food");
                this.getFood();
            },
            error => console.log(error));
    }

    public updateFood = (foodItem: FoodItem): void => {
        this._foodDataService
            .UpdateFood(foodItem.id, foodItem)
            .subscribe((response: FoodItem) => {
                console.log("updated food");
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
        this._foodDataService
            .GetAllFood()
            .subscribe((response: FoodItem[]) => {
                this.foods = response;
            },
            error => console.log(error),
            () => console.log(this.foods));
    }
}