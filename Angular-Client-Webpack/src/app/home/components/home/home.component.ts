import { FoodDataService } from './../../../shared/services/food-data.service';
import { FoodItem } from './../../../shared/models/foodItem.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home-component',
    templateUrl: './home.component.html'
})


export class HomeComponent implements OnInit {

    public selectedFood: FoodItem;
    public lastUpdatedDate: Date;
    public isWorking = false;

    constructor(private _foodDataService: FoodDataService) {

    }

    public ngOnInit() {
        this.getFood();
    }

    public updateFood = (): void => {
        this.getFood();
    }

    private getFood = (): void => {
        this.isWorking = true;
        this._foodDataService
            .GetAllFood()
            .subscribe((response: FoodItem[]) => {
                let foodItems: FoodItem[] = response;
                let randomIndex = Math.floor(Math.random() * foodItems.length);
                this.selectedFood = foodItems[randomIndex];
                this.lastUpdatedDate = new Date();
            },
            error => console.log(error),
            () => this.isWorking = false);
    }

}
