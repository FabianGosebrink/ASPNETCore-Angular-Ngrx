import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { FoodDataService } from '../../../core/data-services/food-data.service';
import { FoodItem } from '../../../shared/models/foodItem.model';
import { ADD_FOOD, createFoodLoadedAction, createLoadFoodAction, LOAD_FOOD } from '../actions/food.actions';

@Injectable()
export class FoodEffects {

    @Effect() addFood$: Observable<Action> = this.actions$.ofType(ADD_FOOD)
        .mergeMap((payload: any) =>
            this.foodDataService.addFood(payload)
                // If successful, dispatch success action with result
                .map((data: any) => (createLoadFoodAction()))
                // If request fails, dispatch failed action
                .catch(() => of({ type: 'LOGIN_FAILED' }))
        );

    @Effect() loadFood$: Observable<Action> = this.actions$.ofType(LOAD_FOOD)
        .mergeMap(() =>
            this.foodDataService.getAllFood()
                // If successful, dispatch success action with result
                .map((data: FoodItem[]) => (createFoodLoadedAction(data)))
                // If request fails, dispatch failed action
                .catch(() => of({ type: 'LOGIN_FAILED' }))
        );

    constructor(
        private foodDataService: FoodDataService,
        private actions$: Actions
    ) { }
}
