import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { FoodItem } from '../../shared/models/foodItem.model';
import { HttpWrapperService } from './httpWrapper.service';

@Injectable()
export class FoodDataService {
  private actionUrl: string;

  constructor(private http: HttpWrapperService) {
    this.actionUrl = environment.server + environment.apiUrl + 'foods/';
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

  deleteFood(item: FoodItem) {
    return this.http
      .delete(this.actionUrl + item.id)
      .pipe(catchError(this.handleError));
  }

  getRandomMeal(): Observable<FoodItem[]> {
    return this.http
      .get<FoodItem[]>(this.actionUrl + 'GetRandomMeal/')
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    return throwError(error || 'Server error');
  }
}
