import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { FoodDataService } from '../../../core/data-services/food-data.service';
import {
  AbstractNotificationService,
  MessageType
} from '../../../core/services/notification.service';
import { FoodItem } from '../../../shared/models/foodItem.model';
import * as foodActions from '../actions/food.actions';
import { FoodErrorAction } from '../actions/food.actions';

@Injectable()
export class FoodEffects {
  @Effect()
  addFood$ = this.actions$.ofType(foodActions.ADD_FOOD).pipe(
    map((action: foodActions.AddFoodAction) => action.foodItem),
    switchMap(foodItem => {
      return this.foodDataService.addFood(foodItem).pipe(
        map((data: FoodItem) => {
          return new foodActions.AddFoodSuccessAction(data);
        }),
        tap(() => {
          this.notificationService.showNotification(
            MessageType.Success,
            'Food',
            'Food added!'
          );
        }),
        catchError((error: any) => of(new foodActions.FoodErrorAction(error)))
      );
    })
  );

  @Effect()
  loadFood$ = this.actions$.ofType(foodActions.LOAD_FOOD).pipe(
    switchMap(() => {
      return this.foodDataService.getAllFood().pipe(
        map((data: any) => {
          return new foodActions.LoadFoodSuccessAction(data.value);
        }),
        catchError((error: any) => of(new foodActions.FoodErrorAction(error)))
      );
    })
  );

  @Effect()
  deleteFood$ = this.actions$.ofType(foodActions.DELETE_FOOD).pipe(
    switchMap((action: foodActions.DeleteFoodAction) => {
      return this.foodDataService.deleteFood(action.foodItem).pipe(
        map((data: any) => {
          this.notificationService.showNotification(
            MessageType.Success,
            'Food',
            'Food deleted!'
          );
          return new foodActions.DeleteFoodSuccessAction(action.foodItem);
        }),
        catchError((error: any) => of(new foodActions.FoodErrorAction(error)))
      );
    })
  );

  @Effect()
  updateFood$ = this.actions$.ofType(foodActions.UPDATE_FOOD).pipe(
    switchMap((action: foodActions.UpdateFoodAction) => {
      return this.foodDataService
        .updateFood(action.foodItem.id, action.foodItem)
        .pipe(
          map((data: any) => {
            this.notificationService.showNotification(
              MessageType.Success,
              'Food',
              'Food updated!'
            );
            return new foodActions.UpdateFoodSuccessAction(data);
          }),
          catchError((error: any) => of(new foodActions.FoodErrorAction(error)))
        );
    })
  );

  @Effect({ dispatch: false })
  foodError = this.actions$
    .ofType(foodActions.FOOD_ERROR)
    .pipe(
      tap((action: FoodErrorAction) =>
        this.notificationService.showNotification(
          MessageType.Error,
          'Food',
          action.error.statusText
        )
      )
    );

  constructor(
    private foodDataService: FoodDataService,
    private notificationService: AbstractNotificationService,
    private actions$: Actions
  ) {}
}
