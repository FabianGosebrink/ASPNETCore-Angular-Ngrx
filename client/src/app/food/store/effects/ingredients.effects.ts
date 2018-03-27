import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { FoodDataService } from '../../../core/data-services/food-data.service';
import {
  AbstractNotificationService,
  MessageType
} from '../../../core/services/notification.service';
import { Ingredient } from '../../../shared/models/ingredient.model';
import * as ingredientActions from '../actions/ingredients.actions';
import { IngredientsDataService } from '../../../core/data-services/ingredient-data.service';

@Injectable()
export class IngredientEffects {
  @Effect()
  loadFood$ = this.actions$.ofType(ingredientActions.LOAD_INGREDIENTS).pipe(
    map((action: ingredientActions.LoadIngredientsAction) => action.payload),
    switchMap((payload: string) => {
      return this.ingredientsDataService.getIngredientsForFood(payload).pipe(
        map((data: any) => {
          return new ingredientActions.LoadIngredientsSuccessAction(data);
        }),
        catchError((error: any) =>
          of(new ingredientActions.IngredientsErrorAction(error))
        )
      );
    })
  );

  @Effect()
  addIngredient$ = this.actions$.ofType(ingredientActions.ADD_INGREDIENT).pipe(
    switchMap((action: ingredientActions.AddIngredientAction) => {
      return this.ingredientsDataService
        .add(action.payload, action.foodId)
        .pipe(
          map((data: Ingredient) => {
            this.notificationService.showNotification(
              MessageType.Success,
              'Ingredients',
              'Ingredients added!'
            );
            return new ingredientActions.AddIngredientSuccessAction(data);
          }),
          catchError((error: any) =>
            of(new ingredientActions.IngredientsErrorAction(error))
          )
        );
    })
  );

  @Effect()
  deleteIngredient$ = this.actions$
    .ofType(ingredientActions.DELETE_INGREDIENT)
    .pipe(
      switchMap((action: ingredientActions.DeleteIngredientAction) => {
        return this.ingredientsDataService
          .delete(action.payload, action.foodId)
          .pipe(
            map((data: any) => {
              this.notificationService.showNotification(
                MessageType.Success,
                'Ingredients',
                'Ingredients deleted!'
              );
              return new ingredientActions.DeleteIngredientSuccessAction(
                action.payload
              );
            }),
            catchError((error: any) =>
              of(new ingredientActions.IngredientsErrorAction(error))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  ingredientsError = this.actions$
    .ofType(ingredientActions.INGREDIENTS_ERROR)
    .pipe(
      tap((action: ingredientActions.IngredientsErrorAction) =>
        this.notificationService.showNotification(
          MessageType.Error,
          'Ingredients',
          action.error.statusText
        )
      )
    );

  constructor(
    private ingredientsDataService: IngredientsDataService,
    private notificationService: AbstractNotificationService,
    private actions$: Actions
  ) {}
}
