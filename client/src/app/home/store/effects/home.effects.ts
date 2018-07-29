import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { FoodDataService } from '../../../core/data-services/food-data.service';
import {
  AbstractNotificationService,
  MessageType
} from '../../../core/services/notification.service';
import * as HomeActions from '../actions/home.actions';
import { HomeErrorAction } from '../actions/home.actions';

@Injectable()
export class HomeEffects {
  @Effect()
  loadRandomMeal$ = this.actions$.ofType(HomeActions.LOAD_RANDOM_MEAL).pipe(
    switchMap((action: HomeActions.LoadRandomMealAction) => {
      return this.foodDataService.getRandomMeal().pipe(
        map((data: any) => {
          return new HomeActions.LoadRandomMealSuccessAction(data.value);
        }),
        catchError((error: any) => of(new HomeActions.HomeErrorAction(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  homeError$ = this.actions$.ofType(HomeActions.HOME_ERROR).pipe(
    tap((action: HomeErrorAction) => {
      this.notificationService.showNotification(
        MessageType.Error,
        'Home',
        action.error.message
      );
    })
  );

  constructor(
    private foodDataService: FoodDataService,
    private notificationService: AbstractNotificationService,
    private actions$: Actions
  ) {}
}
