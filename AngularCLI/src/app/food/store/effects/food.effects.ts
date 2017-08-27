import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Rx';

import { FoodDataService } from '../../../core/data-services/food-data.service';
import { AbstractNotificationService, MessageType } from '../../../core/services/notification.service';
import { FoodItem } from '../../../shared/models/foodItem.model';
import {
    ADD_FOOD,
    ADD_FOOD_SUCCESS,
    createActionOfType,
    DELETE_FOOD,
    DELETE_FOOD_SUCCESS,
    LOAD_FOOD,
    LOAD_FOOD_SUCCESS,
    UPDATE_FOOD,
    UPDATE_FOOD_SUCCESS,
} from '../actions/food.actions';

@Injectable()
export class FoodEffects {

    @Effect() addFood$: Observable<Action> = this.actions$.ofType(ADD_FOOD)
        .mergeMap((action: any) =>
            this.foodDataService.addFood(action.payload)
                // If successful, dispatch success action with result
                .map((data: any) => {
                    this.notificationService.showNotification(MessageType.Success, 'Food', 'Food Added!');
                    return createActionOfType(ADD_FOOD_SUCCESS, data);
                })
                // If request fails, dispatch failed action
                .catch(() => {
                    this.notificationService.showNotification(MessageType.Error, 'Food', 'There was an error :(');
                    return of({ type: 'LOGIN_FAILED' })
                })
        );

    @Effect() loadFood$: Observable<Action> = this.actions$.ofType(LOAD_FOOD)
        .mergeMap(() =>
            this.foodDataService.getAllFood()
                // If successful, dispatch success action with result
                .map((data: FoodItem[]) => {
                    return createActionOfType(LOAD_FOOD_SUCCESS, data);
                })
                // If request fails, dispatch failed action
                .catch(() => of({ type: 'LOGIN_FAILED' }))
        );

    @Effect() deleteFood$: Observable<Action> = this.actions$.ofType(DELETE_FOOD)
        .mergeMap((action: any) =>
            this.foodDataService.deleteFood(action.payload)
                // If successful, dispatch success action with result
                .map((data: any) => {
                    this.notificationService.showNotification(MessageType.Success, 'Food', 'Food deleted!');
                    return createActionOfType(DELETE_FOOD_SUCCESS, action.payload);
                })
                // If request fails, dispatch failed action
                .catch((error: any) => {
                    this.notificationService.showNotification(MessageType.Error, 'Food', error.statusText);
                    return of({ type: 'LOGIN_FAILED' })
                })
        );

    @Effect() updateFood$: Observable<Action> = this.actions$.ofType(UPDATE_FOOD)
        .mergeMap((action: any) =>
            this.foodDataService.deleteFood(action.payload)
                // If successful, dispatch success action with result
                .map((data: any) => {
                    this.notificationService.showNotification(MessageType.Success, 'Food', 'Food deleted!');
                    return createActionOfType(UPDATE_FOOD_SUCCESS, data);
                })
                // If request fails, dispatch failed action
                .catch(() => {
                    this.notificationService.showNotification(MessageType.Error, 'Food', 'There was an error :(');
                    return of({ type: 'LOGIN_FAILED' })
                })
        );

    constructor(
        private foodDataService: FoodDataService,
        private notificationService: AbstractNotificationService,
        private actions$: Actions
    ) { }
}
