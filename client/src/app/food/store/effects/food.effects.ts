import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as foodActions from '../actions/food.actions';
import { FoodDataService } from '@app/core/data-services/food-data.service';
import { AbstractNotificationService } from '@app/core/services/abstract-notification.service';

@Injectable()
export class FoodEffects {
  addFood$ = createEffect(() =>
    this.actions$.pipe(
      ofType(foodActions.addFood),
      switchMap(({ payload }) =>
        this.foodDataService.addFood(payload).pipe(
          map(data => foodActions.addFoodSuccess({ payload: data })),
          catchError(error => of(foodActions.foodError({ payload: error })))
        )
      )
    )
  );

  loadFood$ = createEffect(() =>
    this.actions$.pipe(
      ofType(foodActions.loadFood),
      switchMap(action =>
        this.foodDataService.getAllFood().pipe(
          map(data => foodActions.loadFoodSuccess({ payload: data })),
          catchError(error => of(foodActions.foodError({ payload: error })))
        )
      )
    )
  );

  deleteFood$ = createEffect(() =>
    this.actions$.pipe(
      ofType(foodActions.deleteFood),
      switchMap(({ payload }) =>
        this.foodDataService.deleteFood(payload).pipe(
          map(() => {
            this.notificationService.showSuccess('Food', 'Food deleted!');
            return foodActions.deleteFoodSuccess({ payload });
          }),
          catchError(error => of(foodActions.foodError({ payload: error })))
        )
      )
    )
  );

  updateFood$ = createEffect(() =>
    this.actions$.pipe(
      ofType(foodActions.updateFood),
      switchMap(({ payload }) =>
        this.foodDataService.updateFood(payload.id, payload).pipe(
          map(data => {
            this.notificationService.showSuccess('Food', 'Food updated!');
            return foodActions.updateFoodSuccess({ payload: data });
          }),
          catchError(error => of(foodActions.foodError({ payload: error })))
        )
      )
    )
  );

  foodError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(foodActions.foodError),
        tap(({ payload }) =>
          this.notificationService.showError('Food', payload.error.statusText)
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
