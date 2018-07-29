import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FoodItem } from '../../../shared/models/foodItem.model';

@Component({
  selector: 'app-food-form',
  templateUrl: './food-form.component.html'
})
export class FoodFormComponent implements OnChanges {
  types: string[] = ['Starter', 'Main', 'Dessert'];
  @Input() foodItem: FoodItem;
  @Output() foodUpdated = new EventEmitter<FoodItem>();
  @Output() foodAdded = new EventEmitter<FoodItem>();

  currentFood: FoodItem = new FoodItem();

  addOrUpdateFood() {
    !!this.foodItem
      ? this.foodUpdated.emit(this.currentFood)
      : this.foodAdded.emit(this.currentFood);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentFood = { ...changes.foodItem.currentValue };
  }
}
