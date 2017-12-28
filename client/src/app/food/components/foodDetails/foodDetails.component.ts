import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromStore from '../../store';
import { FoodItem } from 'app/shared/models/foodItem.model';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-food-details',
  templateUrl: './foodDetails.component.html'
})
export class FoodDetailsComponent implements OnInit, OnDestroy {
  selectedItem: FoodItem;
  private subscription: Subscription;

  constructor(private store: Store<fromStore.FoodState>) {}

  ngOnInit() {
    this.subscription = this.store
      .select(fromStore.getSelectedFood)
      .subscribe(item => {
        this.selectedItem = item;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
