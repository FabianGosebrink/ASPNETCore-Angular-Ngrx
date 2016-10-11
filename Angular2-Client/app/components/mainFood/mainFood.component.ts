import { Component, Input, OnInit } from '@angular/core';
import { FoodFormComponent } from '../foodForm/foodForm.component';
import { FoodListComponent } from '../foodList/foodList.component';
import { FoodDetailsComponent } from '../foodDetails/foodDetails.component';
import { FoodDataService } from '../../shared/food.dataservice';
import { FoodItem } from '../../models/foodItem';

@Component({
    selector: 'mainFood-component',
    providers: [FoodDataService],
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