import { Injectable } from '@angular/core';
import { Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { FoodItem } from './../app/shared/models/foodItem.model';

@Injectable()
export class FoodServiceMock {

  private internalFoodList: any[] = [];

  constructor() {
    const fooditem = new FoodItem();
    fooditem.id = this.getRandomNumber(0, 9999).toString();
    fooditem.created = new Date();
    fooditem.calories = this.getRandomNumber(0, 99999);
    fooditem.name = 'FoodItem1';
    this.internalFoodList.push(fooditem);
  }

  getAllFood = (): Observable<FoodItem[]> => {
    return Observable.create((observer: any) => {
      // Yield a single value and complete
      observer.next(this.internalFoodList);
      observer.complete();
    });
  }

  getSingleFood = (id: number): Observable<FoodItem> => {
    return Observable.create((observer: any) => {
      // Yield a single value and complete
      observer.next(this.internalFoodList.find(x => x.id === id));
      observer.complete();
    });
  }

  addFood = (foodItem: FoodItem): Observable<FoodItem> => {
    return Observable.create((observer: any) => {
      // Yield a single value and complete
      this.internalFoodList.push(foodItem);
      observer.next(foodItem);
      observer.complete();
    });
  }

  updateFood = (id: string, foodToUpdate: FoodItem): Observable<FoodItem> => {
    return Observable.create((observer: any) => {
      // Yield a single value and complete
      this.internalFoodList.forEach((item: FoodItem) => {
        if (item.id === id) {
          item = foodToUpdate;
        }
      });

      observer.next(foodToUpdate);
      observer.complete();
    });
  }

  deleteFood = (id: number): Observable<Response> => {
    return Observable.create((observer: any) => {

      const itemToRemove = this.internalFoodList.find(x => x.id === id);
      const indexToRemove = this.internalFoodList.indexOf(itemToRemove);
      this.internalFoodList.splice(indexToRemove, 1);

      observer.next(new Response(new ResponseOptions({
        status: 204
      })));
      observer.complete();
    });
  }

  getRandomMeal = (): Observable<FoodItem[]> => {
    return Observable.create((observer: any) => {

      observer.next([
        new FoodItem(),
        new FoodItem(),
        new FoodItem()
      ]);
      observer.complete();
    });
  }

  private getRandomNumber(min: number, max: number): number {
    return (Math.floor(Math.random() * max) + min);
  }
}
