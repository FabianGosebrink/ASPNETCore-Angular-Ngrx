import { FoodItem } from './../../../shared/models/foodItem.model';
import { FoodDataService } from './../../../shared/services/food-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'foodDetails-component',
    templateUrl: './foodDetails.component.html'
})

export class FoodDetailsComponent implements OnInit {

    public selectedFoodItem: FoodItem = new FoodItem();

    constructor(private _route: ActivatedRoute, private _foodDataService: FoodDataService) { }

    ngOnInit() {
        this._route.params.forEach((params: Params) => {
            let id = +params['foodId'];
            this._foodDataService
                .GetSingleFood(id)
                .subscribe((foodItem: FoodItem) => {
                    this.selectedFoodItem = foodItem;
                }, error => console.log(error));
        });
    }
}
