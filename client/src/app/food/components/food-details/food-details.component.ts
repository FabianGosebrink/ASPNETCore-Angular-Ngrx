import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FoodItem } from '../../../shared/models/foodItem.model';
import * as fromStore from '../../store';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html'
})
export class FoodDetailsComponent implements OnInit {
  selectedItem$: Observable<FoodItem>;

  constructor(private store: Store<fromStore.FoodState>) {}

  ngOnInit() {
    this.selectedItem$ = this.store.select(fromStore.getSelectedFood);
  }
}
