import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromActions from './actions';
import * as fromReducers from './reducers';
import * as fromSelectors from './selectors';

@Injectable({ providedIn: 'root' })
export class HomeStoreFacade {
  loading$ = this.store.pipe(select(fromSelectors.getLoading));
  randomMeal$ = this.store.pipe(select(fromSelectors.getRandomMeal));

  constructor(private store: Store<fromReducers.HomeState>) {}

  loadRandomMeal() {
    this.store.dispatch(new fromActions.LoadRandomMealAction());
  }

  updateFood() {
    this.store.dispatch(new fromActions.LoadRandomMealAction());
  }
}
