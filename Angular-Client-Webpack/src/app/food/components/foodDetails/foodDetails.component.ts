import { FoodItem } from './../../../shared/models/foodItem.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { FoodDataService } from '../../../core/data-services/food-data.service';

@Component({
    selector: 'foodDetails-component',
    templateUrl: './foodDetails.component.html'
})

export class FoodDetailsComponent implements OnInit {

    selectedFoodItem: Observable<FoodItem>;

    constructor(private route: ActivatedRoute, private foodDataService: FoodDataService) { }

    ngOnInit() {
       this.route.paramMap
            .map((paramMap: ParamMap) => paramMap.get('foodId') || '-1')
            .subscribe((foodId: string) => {
                 this.selectedFoodItem =  this.foodDataService.GetSingleFood(foodId);
            });
    }
}
