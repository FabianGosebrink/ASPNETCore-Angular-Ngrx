import { FoodItem } from './../../../shared/models/foodItem.model';
import { FoodDataService } from './../../../shared/services/food-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
    selector: 'foodDetails-component',
    templateUrl: './foodDetails.component.html'
})

export class FoodDetailsComponent implements OnInit {

    public selectedFoodItem: Observable<FoodItem>;

    constructor(private _route: ActivatedRoute, private _foodDataService: FoodDataService) { }

    ngOnInit() {
       this._route.paramMap
            .map((paramMap: ParamMap) => +paramMap.get('foodId') || -1)
            .subscribe((foodId: number) => {
                 this.selectedFoodItem =  this._foodDataService.GetSingleFood(+foodId);
            });
    }
}
