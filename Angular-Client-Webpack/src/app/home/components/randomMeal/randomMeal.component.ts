import { FoodItem } from '../../../shared/models/foodItem.model';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'randomMeal',
    templateUrl: 'randomMeal.component.html'
})

export class RandomMealComponent {

    @Input() fooditem: FoodItem;
}
