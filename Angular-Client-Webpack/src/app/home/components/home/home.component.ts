import { FoodDataService } from './../../../shared/services/food-data.service';
import { FoodItem } from './../../../shared/models/foodItem.model';
import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';

@Component({
    selector: 'home-component',
    templateUrl: './home.component.html'
})


export class HomeComponent implements OnInit {

    public selectedFood: FoodItem;
    public lastUpdatedDate: Date;
    public isWorking = false;

    constructor(private _foodDataService: FoodDataService, private toasterService: ToasterService) {

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

                if (response.length <= 0) {
                    this.toasterService.pop('warning', 'Food', 'No food found...');
                    return;
                }

                let foodItems: FoodItem[] = response;
                let randomIndex = Math.floor(Math.random() * foodItems.length);
                this.selectedFood = foodItems[randomIndex];
                this.lastUpdatedDate = new Date();
                this.toasterService.pop('success', 'Food', 'Food Loaded!');
            },
            (error: any) => {
                console.log(error)
                this.toasterService.pop('error', 'Food', 'There was an error :(');
            },
            () => this.isWorking = false);
    }

}
