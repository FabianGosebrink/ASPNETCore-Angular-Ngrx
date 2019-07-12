import { Injectable } from '@angular/core';
import { HttpWrapperService } from './httpWrapper.service';
import { FoodItem } from '@app/shared/models/foodItem.model';
import { environment } from '@environments/environment';
import { ModelDescriptor } from '@app/shared/models/model.descriptor';

@Injectable({ providedIn: 'root' })
export class FoodDataService {
  private actionUrl: string;

  constructor(private http: HttpWrapperService) {
    this.actionUrl = environment.server + environment.apiUrl + 'foods/';
  }

  getAllFood() {
    return this.http.get<ModelDescriptor<FoodItem[]>>(this.actionUrl);
  }

  getSingleFood(id: string) {
    return this.http.get<FoodItem>(this.actionUrl + id);
  }

  addFood(foodItem: FoodItem) {
    foodItem.created = new Date();

    return this.http.post<FoodItem>(this.actionUrl, foodItem);
  }

  updateFood(id: string, foodToUpdate: FoodItem) {
    return this.http.put<FoodItem>(this.actionUrl + id, foodToUpdate);
  }

  deleteFood(item: FoodItem) {
    return this.http.delete(this.actionUrl + item.id);
  }

  getRandomMeal() {
    return this.http.get<ModelDescriptor<FoodItem[]>>(
      this.actionUrl + 'getrandommeal/'
    );
  }
}
