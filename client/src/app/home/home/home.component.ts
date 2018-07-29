import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FoodItem } from '../../shared/models/foodItem.model';
import * as fromStore from '../store';
import * as homeActions from '../store/actions/home.actions';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  randomMeal$: Observable<FoodItem[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromStore.HomeState>) {}

  ngOnInit() {
    this.randomMeal$ = this.store.select(fromStore.getRandomMeal);
    this.loading$ = this.store.select(fromStore.getLoading);

    this.store.dispatch(new homeActions.LoadRandomMealAction());
  }

  updateFood() {
    this.store.dispatch(new homeActions.LoadRandomMealAction());
  }
}
