import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { FoodDataService } from '../../../core/data-services/food-data.service';
import { AbstractNotificationService } from '../../../core/services/abstract-notification.service';
import { FoodItem } from '../../../shared/models/foodItem.model';
import * as foodActions from '../actions/food.actions';

@Injectable()
export class FoodEffects {
  @Effect()
  addFood$ = this.actions$.pipe(
    ofType(foodActions.ADD_FOOD),
    map((action: foodActions.AddFoodAction) => action.foodItem),
    switchMap(foodItem => {
      return this.foodDataService.addFood(foodItem).pipe(
        map((data: FoodItem) => {
          this.notificationService.showSuccess('Food', 'Food added!');
          return new foodActions.AddFoodSuccessAction(data);
        }),
        catchError((error: any) => of(new foodActions.FoodErrorAction(error)))
      );
    })
  );

  @Effect()
  loadFood$ = this.actions$.pipe(
    ofType(foodActions.LOAD_FOOD),
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
  deleteFood$ = this.actions$.pipe(
    ofType(foodActions.DELETE_FOOD),
    switchMap((action: foodActions.DeleteFoodAction) => {
      return this.foodDataService.deleteFood(action.foodItem).pipe(
        map((data: any) => {
          this.notificationService.showSuccess('Food', 'Food deleted!');
          return new foodActions.DeleteFoodSuccessAction(action.foodItem);
        }),
        catchError((error: any) => of(new foodActions.FoodErrorAction(error)))
      );
    })
  );

  @Effect()
  updateFood$ = this.actions$.pipe(
    ofType(foodActions.UPDATE_FOOD),
    switchMap((action: foodActions.UpdateFoodAction) => {
      return this.foodDataService
        .updateFood(action.foodItem.id, action.foodItem)
        .pipe(
          map((data: any) => {
            this.notificationService.showSuccess('Food', 'Food updated!');
            return new foodActions.UpdateFoodSuccessAction(data);
          }),
          catchError((error: any) => of(new foodActions.FoodErrorAction(error)))
        );
    })
  );

  @Effect({ dispatch: false })
  foodError = this.actions$.pipe(
    ofType(foodActions.FOOD_ERROR),
    tap((action: foodActions.FoodErrorAction) =>
      this.notificationService.showError('Food', action.error.statusText)
    )
  );

  constructor(
    private foodDataService: FoodDataService,
    private notificationService: AbstractNotificationService,
    private actions$: Actions
  ) {}
}
