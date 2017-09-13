import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Rx';

import { FoodDataService } from '../../../core/data-services/food-data.service';
import { AbstractNotificationService, MessageType } from '../../../core/services/notification.service';
import { FoodItem } from '../../../shared/models/foodItem.model';
import * as HomeActions from '../actions/home.actions';

@Injectable()
export class HomeEffects {

    @Effect() loadFood$: Observable<Action> = this.actions$.ofType(HomeActions.LOAD_FOOD)
        .switchMap((action: HomeActions.LoadFoodAction) =>
                this.foodDataService.getAllFood()
                .map((data: any) => {
                    return new HomeActions.LoadFoodSuccessAction(data.value);
                })
                .catch((error: any) => {
                    this.notificationService.showNotification(MessageType.Error, 'Food', error.statusText);
                    return of({ type: 'LOGIN_FAILED' })
                })
        );

    @Effect() loadRandomMeal$: Observable<Action> = this.actions$.ofType(HomeActions.LOAD_RANDOM_MEAL)
        .switchMap((action: HomeActions.LoadRandomMealAction) =>
            this.foodDataService.getRandomMeal()
                .map((data: FoodItem[]) => {
                    return new HomeActions.LoadRandomMealSuccessAction(data);
                })
                .catch((error: any) => {
                    this.notificationService.showNotification(MessageType.Error, 'Food', error.statusText);
                    return of({ type: 'LOGIN_FAILED' })
                })
        );

    constructor(
        private foodDataService: FoodDataService,
        private notificationService: AbstractNotificationService,
        private actions$: Actions
    ) { }
}
