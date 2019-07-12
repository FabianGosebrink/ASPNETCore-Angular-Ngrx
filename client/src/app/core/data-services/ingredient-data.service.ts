import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpWrapperService } from './httpWrapper.service';
import { environment } from '@environments/environment';
import { Ingredient } from '@app/shared/models/ingredient.model';

@Injectable({ providedIn: 'root' })
export class IngredientsDataService {
  private actionUrl: string;
  private endpoint = 'ingredients';

  constructor(private http: HttpWrapperService) {
    this.actionUrl = environment.server + environment.apiUrl + 'foods/';
  }

  getIngredientsForFood(foodId: string): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(
      `${this.actionUrl}${foodId}/${this.endpoint}`
    );
  }

  add(ingredient: Ingredient, foodId: string): Observable<Ingredient> {
    return this.http.post<Ingredient>(
      `${this.actionUrl}${foodId}/${this.endpoint}`,
      ingredient
    );
  }

  delete(ingredient: Ingredient, foodId: string) {
    return this.http.delete(
      `${this.actionUrl}${foodId}/${this.endpoint}/${ingredient.id}`
    );
  }
}
