import { Component, OnInit, Input } from '@angular/core';
import { FoodItem } from '../../../shared/models/foodItem.model';

@Component({
    selector: 'randomMeal',
    templateUrl: 'randomMeal.component.html'
})

export class RandomMealComponent {

    @Input() fooditem: FoodItem;
}
