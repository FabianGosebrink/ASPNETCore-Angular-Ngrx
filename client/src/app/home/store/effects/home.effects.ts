import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';
import { tap } from 'rxjs/operators/tap';

import { FoodDataService } from '../../../core/data-services/food-data.service';
import { AbstractNotificationService, MessageType } from '../../../core/services/notification.service';
import { HomeErrorAction } from '../actions/home.actions';
import * as HomeActions from '../actions/home.actions';

@Injectable()
export class HomeEffects {

    @Effect() loadFood$ = this.actions$.ofType(HomeActions.LOAD_FOOD).pipe(
        switchMap(() => {
            return this.foodDataService.getAllFood().pipe(
                map((data: any) => {
                    return new HomeActions.LoadFoodSuccessAction(data.value);
                }),
                catchError((error: any) => of(new HomeActions.HomeErrorAction(error))
                ))
        }));

    @Effect() loadRandomMeal$ = this.actions$.ofType(HomeActions.LOAD_RANDOM_MEAL).pipe(
        switchMap((action: HomeActions.LoadRandomMealAction) => {
            return this.foodDataService.getRandomMeal().pipe(
                map((data: any) => {
                    return new HomeActions.LoadRandomMealSuccessAction(data.value);
                }),
                catchError((error: any) => of(new HomeActions.HomeErrorAction(error))
                ))
        }));

    @Effect({ dispatch: false }) homeError$ = this.actions$
        .ofType(HomeActions.HOME_ERROR)
        .pipe(tap((action: HomeErrorAction) => {
            this.notificationService.showNotification(MessageType.Error, 'Home', action.error.message)
        }));

    constructor(
        private foodDataService: FoodDataService,
        private notificationService: AbstractNotificationService,
        private actions$: Actions
    ) { }
}
