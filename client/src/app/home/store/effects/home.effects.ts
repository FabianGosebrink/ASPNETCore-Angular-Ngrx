import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Rx';

import { FoodDataService } from '../../../core/data-services/food-data.service';
import { AbstractNotificationService, MessageType } from '../../../core/services/notification.service';
import { HomeErrorAction } from '../actions/home.actions';
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
                    return of(new HomeActions.HomeErrorAction(error));
                })
        );

    @Effect() loadRandomMeal$: Observable<Action> = this.actions$.ofType(HomeActions.LOAD_RANDOM_MEAL)
        .switchMap((action: HomeActions.LoadRandomMealAction) =>
            this.foodDataService.getRandomMeal()
                .map((data: any) => {
                    return new HomeActions.LoadRandomMealSuccessAction(data.value);
                })
                .catch((error: any) => {
                    return of(new HomeActions.HomeErrorAction(error));
                })
        );

    @Effect({ dispatch: false }) homeError: Observable<Action> = this.actions$
        .ofType(HomeActions.HOME_ERROR)
        .do((action: HomeErrorAction) => {
            console.log(action.error);
            this.notificationService.showNotification(MessageType.Error, 'Home', action.error.message)
        });

    constructor(
        private foodDataService: FoodDataService,
        private notificationService: AbstractNotificationService,
        private actions$: Actions
    ) { }
}
