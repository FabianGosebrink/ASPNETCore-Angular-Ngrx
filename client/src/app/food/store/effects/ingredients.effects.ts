import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { IngredientsDataService } from '../../../core/data-services/ingredient-data.service';
import { AbstractNotificationService } from '../../../core/services/abstract-notification.service';
import { Ingredient } from '../../../shared/models/ingredient.model';
import * as ingredientActions from '../actions/ingredients.actions';

@Injectable()
export class IngredientEffects {
  @Effect()
  loadFood$ = this.actions$.pipe(
    ofType(ingredientActions.LOAD_INGREDIENTS),
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
  addIngredient$ = this.actions$.pipe(
    ofType(ingredientActions.ADD_INGREDIENT),
    switchMap((action: ingredientActions.AddIngredientAction) => {
      return this.ingredientsDataService
        .add(action.payload, action.foodId)
        .pipe(
          map((data: Ingredient) => {
            this.notificationService.showSuccess(
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
  deleteIngredient$ = this.actions$.pipe(
    ofType(ingredientActions.DELETE_INGREDIENT),
    switchMap((action: ingredientActions.DeleteIngredientAction) => {
      return this.ingredientsDataService
        .delete(action.payload, action.foodId)
        .pipe(
          map((data: any) => {
            this.notificationService.showSuccess(
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
  ingredientsError = this.actions$.pipe(
    ofType(ingredientActions.INGREDIENTS_ERROR),

    tap((action: ingredientActions.IngredientsErrorAction) =>
      this.notificationService.showError('Ingredients', action.error.statusText)
    )
  );

  constructor(
    private ingredientsDataService: IngredientsDataService,
    private notificationService: AbstractNotificationService,
    private actions$: Actions
  ) {}
}
