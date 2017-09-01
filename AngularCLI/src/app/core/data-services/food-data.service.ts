import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Configuration } from '../../shared/configuration/app.configuration';
import { FoodItem } from '../../shared/models/foodItem.model';
import { HttpWrapperService } from '../services/httpWrapper.service';

@Injectable()
export class FoodDataService {

    public actionUrl: string;

    constructor(private http: HttpWrapperService, private configuration: Configuration) {
        this.actionUrl = configuration.server + configuration.apiUrl + 'foods/';
    }

    getAllFood = (): Observable<FoodItem[]> => {
        return this.http.get<FoodItem[]>(this.actionUrl)
            .catch(this.handleError);
    }

    getSingleFood = (id: string): Observable<FoodItem> => {
        return this.http.get<FoodItem>(this.actionUrl + id)
            .catch(this.handleError);
    }

    addFood = (foodItem: FoodItem): Observable<FoodItem> => {
        foodItem.created = new Date();

        return this.http.post<FoodItem>(this.actionUrl, foodItem)
            .catch(this.handleError);
    }

    updateFood = (id: string, foodToUpdate: FoodItem): Observable<FoodItem> => {
        return this.http.put<FoodItem>(this.actionUrl + id, JSON.stringify(foodToUpdate))
            .catch(this.handleError);
    }

    deleteFood = (item: FoodItem): Observable<HttpResponse<any>> => {
        return this.http.delete(this.actionUrl + item.id)
            .catch(this.handleError);
    }

    getRandomMeal = (): Observable<FoodItem[]> => {
        return this.http.get<FoodItem[]>(this.actionUrl + 'GetRandomMeal/')
            .catch(this.handleError);
    }

    private handleError(error: HttpResponse<any>) {
        console.error(error);
        return Observable.throw(error || 'Server error');
    }
}
