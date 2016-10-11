import { Component, OnInit } from '@angular/core';
import { FoodDataService } from '../../shared/food.dataservice';
import { FoodItem } from '../../models/foodItem';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'foodDetails-component',
    providers: [FoodDataService],
    templateUrl: 'app/components/foodDetails/foodDetails.component.html'
})

export class FoodDetailsComponent implements OnInit {

    public selectedFoodItem: FoodItem = new FoodItem();

    constructor(private _route: ActivatedRoute, private _foodDataService: FoodDataService) {

    }

    ngOnInit() {
        this._route.params.forEach((params: Params) => {
            let foodId = +params['foodId']; // (+) converts string 'id' to a number
            this._foodDataService
                .GetSingleFood(foodId)
                .subscribe((foodItem: FoodItem) => {
                    this.selectedFoodItem = foodItem;
                }, error => console.log(error));
        });
    }
}