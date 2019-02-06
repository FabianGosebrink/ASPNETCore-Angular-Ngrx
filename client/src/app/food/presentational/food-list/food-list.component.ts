import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sorter } from '@app/core/services/sort.service';
import { FoodItem } from '@app/shared/models/foodItem.model';

@Component({
  selector: 'app-foodlist',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css'],
})
export class FoodListComponent {
  foodItem: FoodItem;
  foodToDelete: FoodItem;
  searchString: string;

  @Input() foods: FoodItem[];
  @Output() foodSelected = new EventEmitter<FoodItem>();
  @Output() foodDeleted = new EventEmitter<FoodItem>();

  constructor(private sorter: Sorter) {}

  setFoodToDelete(foodItem: FoodItem): void {
    this.foodToDelete = foodItem;
  }

  sortArray(key: string, $event: any) {
    if ($event) {
      $event.preventDefault();
    }
    this.sorter.sort(key, this.foods);
  }
}
