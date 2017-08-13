import 'rxjs/add/operator/map';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { FoodDataService } from '../../../core/data-services/food-data.service';
import { FoodItem } from './../../../shared/models/foodItem.model';

@Component({
    selector: 'app-food-details',
    templateUrl: './foodDetails.component.html'
})

export class FoodDetailsComponent implements OnInit {

    selectedFoodItem: FoodItem;

    constructor(private route: ActivatedRoute, private foodDataService: FoodDataService) { }

    ngOnInit() {
        this.route.paramMap
            .map((paramMap: ParamMap) => paramMap.get('foodId') || '-1')
            .subscribe((foodId: string) => {
                this.foodDataService.getSingleFood(foodId)
                    .subscribe((foodItem: FoodItem) => {
                        this.selectedFoodItem = foodItem;
                    });
            });
    }
}
