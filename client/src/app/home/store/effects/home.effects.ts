import { Injectable } from '@angular/core';
import { FoodDataService } from '@app/core/data-services/food-data.service';
import { AbstractNotificationService } from '@app/core/services/abstract-notification.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as HomeActions from '../actions/home.actions';

@Injectable()
export class HomeEffects {
  @Effect()
  loadRandomMeal$ = this.actions$.pipe(
    ofType(HomeActions.LOAD_RANDOM_MEAL),
    switchMap(() => {
      return this.foodDataService.getRandomMeal().pipe(
        map((data: any) => {
          return new HomeActions.LoadRandomMealSuccessAction(data.value);
        }),
        catchError((error: any) => of(new HomeActions.HomeErrorAction(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  homeError$ = this.actions$.pipe(
    ofType(HomeActions.HOME_ERROR),
    tap((action: HomeActions.HomeErrorAction) => {
      this.notificationService.showError('Home', action.error.message);
    })
  );

  constructor(
    private foodDataService: FoodDataService,
    private notificationService: AbstractNotificationService,
    private actions$: Actions
  ) {}
}
