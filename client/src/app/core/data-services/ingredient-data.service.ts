import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { catchError } from 'rxjs/operators/catchError';

import { HttpWrapperService } from './httpWrapper.service';

import { environment } from '../../../environments/environment';
import { Ingredient } from '../../shared/models/ingredient.model';

@Injectable()
export class IngredientsDataService {
  private actionUrl: string;
  private endpoint = 'ingredients';

  constructor(private http: HttpWrapperService) {
    this.actionUrl = environment.server + environment.apiUrl + 'foods/';
  }

  getIngredientsForFood(foodId: string): Observable<Ingredient[]> {
    return this.http
      .get<Ingredient[]>(`${this.actionUrl}${foodId}/${this.endpoint}`)
      .pipe(catchError(this.handleError));
  }

  //   getSingleFood(id: string): Observable<FoodItem> {
  //     return this.http
  //       .get<FoodItem>(this.actionUrl + id)
  //       .pipe(catchError(this.handleError));
  //   }

  add(ingredient: Ingredient, foodId: string): Observable<Ingredient> {
    return this.http
      .post<Ingredient>(
        `${this.actionUrl}${foodId}/${this.endpoint}`,
        ingredient
      )
      .pipe(catchError(this.handleError));
  }

  //   updateFood(id: string, foodToUpdate: FoodItem): Observable<FoodItem> {
  //     return this.http
  //       .put<FoodItem>(this.actionUrl + id, JSON.stringify(foodToUpdate))
  //       .pipe(catchError(this.handleError));
  //   }

  //   deleteFood(item: FoodItem): Observable<HttpResponse<any>> {
  //     return this.http
  //       .delete(this.actionUrl + item.id)
  //       .pipe(catchError(this.handleError));
  //   }

  private handleError(error: any) {
    return _throw(error || 'Server error');
  }
}
