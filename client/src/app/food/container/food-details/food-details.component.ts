import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodItem } from '../../../shared/models/foodItem.model';
import { FoodStoreFacade } from '../../store/food-store.facade';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
})
export class FoodDetailsComponent implements OnInit {
  selectedItem$: Observable<FoodItem>;

  constructor(private facade: FoodStoreFacade) {}

  ngOnInit() {
    this.selectedItem$ = this.facade.selectedFood$;
  }
}
