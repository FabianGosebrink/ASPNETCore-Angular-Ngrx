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

  add(ingredient: Ingredient, foodId: string): Observable<Ingredient> {
    return this.http
      .post<Ingredient>(
        `${this.actionUrl}${foodId}/${this.endpoint}`,
        ingredient
      )
      .pipe(catchError(this.handleError));
  }

  delete(
    ingredient: Ingredient,
    foodId: string
  ): Observable<HttpResponse<any>> {
    return this.http
      .delete(`${this.actionUrl}${foodId}/${this.endpoint}/${ingredient.id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    return _throw(error || 'Server error');
  }
}
