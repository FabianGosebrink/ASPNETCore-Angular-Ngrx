import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { IngredientsDataService } from '@app/core/data-services/ingredient-data.service';
import { AbstractNotificationService } from '@app/core/services/abstract-notification.service';
import * as ingredientActions from '../actions/ingredients.actions';

@Injectable()
export class IngredientEffects {
  addIngredient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ingredientActions.addIngredient),
      switchMap(({ payload, foodId }) =>
        this.ingredientsDataService.add(payload, foodId).pipe(
          map(data =>
            ingredientActions.addIngredientSuccess({ payload: data })
          ),
          catchError(error =>
            of(ingredientActions.ingredientError({ payload: error }))
          )
        )
      )
    )
  );

  loadIngredients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ingredientActions.loadIngredients),
      switchMap(({ payload }) =>
        this.ingredientsDataService.getIngredientsForFood(payload).pipe(
          map(data =>
            ingredientActions.loadIngredientsSuccess({ payload: data })
          ),
          catchError(error =>
            of(ingredientActions.ingredientError({ payload: error }))
          )
        )
      )
    )
  );

  deleteIngredient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ingredientActions.deleteIngredient),
      switchMap(({ payload, foodId }) =>
        this.ingredientsDataService.delete(payload, foodId).pipe(
          map(() => {
            this.notificationService.showSuccess(
              'Ingredients',
              'Ingredient deleted!'
            );
            return ingredientActions.deleteIngredientSuccess({ payload });
          }),
          catchError(error =>
            of(ingredientActions.ingredientError({ payload: error }))
          )
        )
      )
    )
  );

  ingredientError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ingredientActions.ingredientError),
        tap(({ payload }) =>
          this.notificationService.showError(
            'Ingredients',
            payload.error.statusText
          )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private ingredientsDataService: IngredientsDataService,
    private notificationService: AbstractNotificationService,
    private actions$: Actions
  ) {}
}
