import { Response, ResponseOptions } from '@angular/http';
import { FoodItem } from './../app/shared/models/foodItem.model';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class FoodServiceMock {

    private internalFoodList: any[] = [];

    constructor() {
        let fooditem = new FoodItem();
        fooditem.id = 1;
        fooditem.created = new Date();
        fooditem.calories = 999;
        fooditem.name = 'FoodItem1';
        this.internalFoodList.push(fooditem);
    }

    public GetAllFood = (): Observable<FoodItem[]> => {
        return Observable.create((observer: any) => {
            // Yield a single value and complete
            observer.next(this.internalFoodList);
            observer.complete();
        });
    }

    public GetSingleFood = (id: number): Observable<FoodItem> => {
        return Observable.create((observer: any) => {
            // Yield a single value and complete
            observer.next(this.internalFoodList.find(x => x.id === id));
            observer.complete();
        });
    }

    public AddFood = (foodItem: FoodItem): Observable<FoodItem> => {
        return Observable.create((observer: any) => {
            // Yield a single value and complete
            this.internalFoodList.push(foodItem);
            observer.next(foodItem);
            observer.complete();
        });
    }

    public UpdateFood = (id: number, foodToUpdate: FoodItem): Observable<FoodItem> => {
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

    public DeleteFood = (id: number): Observable<Response> => {
        return Observable.create((observer: any) => {

            let itemToRemove = this.internalFoodList.find(x => x.id === id);
            let indexToRemove = this.internalFoodList.indexOf(itemToRemove);
            this.internalFoodList.splice(indexToRemove, 1);

            observer.next(new Response(new ResponseOptions({
                status: 204
            })));
            observer.complete();
        });
    }
}
