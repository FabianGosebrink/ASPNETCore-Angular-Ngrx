import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import { FoodDataService } from '../../../core/data-services/food-data.service';
import { AbstractNotificationService, MessageType } from '../../../core/services/notification.service';
import { FoodItem } from '../../../shared/models/foodItem.model';
import * as FoodActions from '../actions/food.actions';
import { FoodErrorAction } from '../actions/food.actions';

@Injectable()
export class FoodEffects {

  @Effect() addFood$ = this.actions$.ofType(FoodActions.ADD_FOOD).pipe(
    switchMap((action: FoodActions.AddFoodAction) => {
      return this.foodDataService.addFood(action.foodItem).pipe(
        map((data: FoodItem) => {
          this.notificationService.showNotification(MessageType.Success, 'Food', 'Food added!');
          return new FoodActions.AddFoodSuccessAction(data);
        }),
        catchError((error: any) => of(new FoodActions.FoodErrorAction(error))
        ))
    }));


  @Effect() loadFood$ = this.actions$.ofType(FoodActions.LOAD_FOOD).pipe(
    switchMap(() => {
      return this.foodDataService.getAllFood().pipe(
        map((data: any) => {
          return new FoodActions.LoadFoodSuccessAction(data.value);
        }),
        catchError((error: any) => of(new FoodActions.FoodErrorAction(error))
        ))
    }));


  @Effect() deleteFood$ = this.actions$.ofType(FoodActions.DELETE_FOOD).pipe(
    switchMap((action: FoodActions.DeleteFoodAction) => {
      return this.foodDataService.deleteFood(action.foodItem).pipe(
        map((data: any) => {
          this.notificationService.showNotification(MessageType.Success, 'Food', 'Food deleted!');
          return new FoodActions.DeleteFoodSuccessAction(action.foodItem);
        }),
        catchError((error: any) => of(new FoodActions.FoodErrorAction(error))
        ))
    }));


  @Effect() updateFood$ = this.actions$.ofType(FoodActions.UPDATE_FOOD).pipe(
    switchMap((action: FoodActions.UpdateFoodAction) => {
      return this.foodDataService.updateFood(action.foodItem.id, action.foodItem).pipe(
        map((data: any) => {
          this.notificationService.showNotification(MessageType.Success, 'Food', 'Food updated!');
          return new FoodActions.UpdateFoodSuccessAction(data);
        }),
        catchError((error: any) => of(new FoodActions.FoodErrorAction(error))
        ))
    }));


  @Effect() getSingleFood$ = this.actions$.ofType(FoodActions.SELECT_FOOD).pipe(
    switchMap((action: FoodActions.SelectFoodAction) => {
      return this.foodDataService.getSingleFood(action.foodItem.id).pipe(
        map((data: any) => {
          return new FoodActions.SelectFoodSuccessAction(data);
        }),
        catchError((error: any) => of(new FoodActions.FoodErrorAction(error))
        ))
    }));


  @Effect() loadSingleFood$ = this.actions$.ofType(FoodActions.LOAD_SINGLE_FOOD).pipe(
    switchMap((action: FoodActions.LoadSingleFoodAction) => {
      return this.foodDataService.getSingleFood(action.id).pipe(
        map((data: any) => {
          return new FoodActions.LoadSingleFoodSuccessAction(data);
        }),
        catchError((error: any) => of(new FoodActions.FoodErrorAction(error))
        ))
    }));


  @Effect({ dispatch: false }) foodError = this.actions$
    .ofType(FoodActions.FOOD_ERROR)
    .do((action: FoodErrorAction) =>
      this.notificationService.showNotification(MessageType.Error, 'Food', action.error.statusText)
    );

  constructor(
    private foodDataService: FoodDataService,
    private notificationService: AbstractNotificationService,
    private actions$: Actions
  ) { }
}
