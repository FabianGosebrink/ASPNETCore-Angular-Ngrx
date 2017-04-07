import { FoodDataService } from './../../../shared/services/food-data.service';
import { FoodItem } from './../../../shared/models/foodItem.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ToasterService } from 'angular2-toaster/angular2-toaster';

@Component({
    selector: 'mainFood-component',
    templateUrl: './mainFood.component.html'
})

export class MainFoodComponent implements OnInit {
    public foodSelectedFromList: FoodItem;
    public foods: Observable<FoodItem[]>;

    constructor(private _foodDataService: FoodDataService, private toasterService: ToasterService) {
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
                this.toasterService.pop('success', 'Food', 'Food Added!');
                this.resetCurrentlySelectedFoodItem();
                this.getFood();
            },
            (error: any) => {
                console.log(error)
                this.toasterService.pop('error', 'Food', 'There was an error :(');
            });
    }

    public updateFood = (foodItem: FoodItem): void => {
        this._foodDataService
            .UpdateFood(foodItem.id, foodItem)
            .subscribe((response: FoodItem) => {
                this.toasterService.pop('success', 'Food', 'Food Updated!');
                this.resetCurrentlySelectedFoodItem();
                this.getFood();
            },
            (error: any) => {
                console.log(error)
                this.toasterService.pop('error', 'Food', 'There was an error :(');
            });
    }

    public deleteFood(foodItem: FoodItem) {
        this._foodDataService
            .DeleteFood(foodItem.id)
            .subscribe(() => {
                this.toasterService.pop('success', 'Food', 'Food Deleted!');
                this.getFood();
            },
            (error: any) => {
                console.log(error)
                this.toasterService.pop('error', 'Food', 'There was an error :(');
            });
    }

    private getFood = (): void => {
        this.foods = this._foodDataService.GetAllFood();
    }

    private resetCurrentlySelectedFoodItem() {
        this.setCurrentlySelectedFood(new FoodItem());
    }
}
