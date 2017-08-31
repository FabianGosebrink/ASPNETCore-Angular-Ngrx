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
import * as FoodActions from '../actions/food.actions';

@Injectable()
export class FoodEffects {

    @Effect() addFood$: Observable<Action> = this.actions$.ofType(FoodActions.ADD_FOOD)
        .switchMap((action: FoodActions.AddFoodAction) =>
            this.foodDataService.addFood(action.foodItem)
                .map((data: FoodItem) => {
                    this.notificationService.showNotification(MessageType.Success, 'Food', 'Food Added!');
                    return new FoodActions.AddFoodSuccessAction(data);
                })
                .catch((error: any) => {
                    this.notificationService.showNotification(MessageType.Error, 'Food', error.statusText);
                    return of({ type: 'LOGIN_FAILED' })
                })
        );

    @Effect() loadFood$: Observable<Action> = this.actions$.ofType(FoodActions.LOAD_FOOD)
        .switchMap(() =>
            this.foodDataService.getAllFood()
                .map((data: FoodItem[]) => {
                    return new FoodActions.LoadFoodSuccessAction(data);
                })
                .catch((error: any) => {
                    this.notificationService.showNotification(MessageType.Error, 'Food', error.statusText);
                    return of({ type: 'LOGIN_FAILED' })
                })
        );

    @Effect() deleteFood$: Observable<Action> = this.actions$.ofType(FoodActions.DELETE_FOOD)
        .switchMap((action: FoodActions.DeleteFoodAction) =>
            this.foodDataService.deleteFood(action.foodItem)
                .map((data: any) => {
                    this.notificationService.showNotification(MessageType.Success, 'Food', 'Food deleted!');
                    return new FoodActions.DeleteFoodSuccessAction(action.foodItem);
                })
                .catch((error: any) => {
                    this.notificationService.showNotification(MessageType.Error, 'Food', error.statusText);
                    return of({ type: 'LOGIN_FAILED' })
                })
        );

    @Effect() updateFood$: Observable<Action> = this.actions$.ofType(FoodActions.UPDATE_FOOD)
        .switchMap((action: FoodActions.UpdateFoodAction) =>
            this.foodDataService.updateFood(action.foodItem.id, action.foodItem)
                .map((data: FoodItem) => {
                    this.notificationService.showNotification(MessageType.Success, 'Food', 'Food updated!');
                    return new FoodActions.UpdateFoodSuccessAction(data);
                })
                .catch((error: any) => {
                    this.notificationService.showNotification(MessageType.Error, 'Food', error.statusText);
                    return of({ type: 'LOGIN_FAILED' })
                })
        );

    @Effect() getSingleFood$: Observable<Action> = this.actions$.ofType(FoodActions.SELECT_FOOD)
        .switchMap((action: FoodActions.SelectFoodAction) =>
            this.foodDataService.getSingleFood(action.foodItem.id)
                .map((data: any) => {
                    return new FoodActions.SelectFoodSuccessAction(action.foodItem);
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
