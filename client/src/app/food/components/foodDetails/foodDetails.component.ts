import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as FoodActions from '../../store/actions/food.actions';
import { FoodState } from '../../store/reducer/food.reducer';

@Component({
  selector: 'app-food-details',
  templateUrl: './foodDetails.component.html'
})

export class FoodDetailsComponent implements OnInit {
  selectedItemState$: Observable<FoodState>;

  constructor(private route: ActivatedRoute, private store: Store<any>) {
    this.selectedItemState$ = this.store.select<FoodState>(state => state.food.selectedItem);
  }

  ngOnInit() {
    this.store.dispatch(new FoodActions.LoadSingleFoodAction(this.route.snapshot.paramMap.get('foodId')));
  }
}
