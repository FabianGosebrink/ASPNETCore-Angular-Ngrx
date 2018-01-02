import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';

import { Configuration } from '../../shared/configuration/app.configuration';
import { FoodItem } from '../../shared/models/foodItem.model';
import { HttpWrapperService } from '../services/httpWrapper.service';

@Injectable()
export class FoodDataService {
  private actionUrl: string;

  constructor(
    private http: HttpWrapperService,
    private configuration: Configuration
  ) {
    this.actionUrl = configuration.server + configuration.apiUrl + 'foods/';
  }

  getAllFood(): Observable<FoodItem[]> {
    return this.http
      .get<FoodItem[]>(this.actionUrl)
      .pipe(catchError(this.handleError));
  }

  getSingleFood(id: string): Observable<FoodItem> {
    return this.http
      .get<FoodItem>(this.actionUrl + id)
      .pipe(catchError(this.handleError));
  }

  addFood(foodItem: FoodItem): Observable<FoodItem> {
    foodItem.created = new Date();

    return this.http
      .post<FoodItem>(this.actionUrl, foodItem)
      .pipe(catchError(this.handleError));
  }

  updateFood(id: string, foodToUpdate: FoodItem): Observable<FoodItem> {
    return this.http
      .put<FoodItem>(this.actionUrl + id, JSON.stringify(foodToUpdate))
      .pipe(catchError(this.handleError));
  }

  deleteFood(item: FoodItem): Observable<HttpResponse<any>> {
    return this.http
      .delete(this.actionUrl + item.id)
      .pipe(catchError(this.handleError));
  }

  getRandomMeal(): Observable<FoodItem[]> {
    return this.http
      .get<FoodItem[]>(this.actionUrl + 'GetRandomMeal/')
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    return Observable.throw(error || 'Server error');
  }
}
