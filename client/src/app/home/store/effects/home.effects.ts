import { Injectable } from '@angular/core';
import { FoodDataService } from '@app/core/data-services/food-data.service';
import { AbstractNotificationService } from '@app/core/services/abstract-notification.service';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as homeActions from '../actions/home.actions';

@Injectable()
export class HomeEffects {
  loadRandomMeal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homeActions.loadRandomMeal),
      switchMap(() =>
        this.foodDataService.getRandomMeal().pipe(
          map(data => homeActions.loadRandomMealSuccess({ payload: data })),
          catchError(error =>
            of(homeActions.loadRandomMealError({ payload: error }))
          )
        )
      )
    )
  );

  homeError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(homeActions.loadRandomMealError),
        tap(({ payload }) =>
          this.notificationService.showError('Home', payload.error.statusText)
        )
      ),
    { dispatch: false }
  );

  constructor(
    private foodDataService: FoodDataService,
    private notificationService: AbstractNotificationService,
    private actions$: Actions
  ) {}
}
