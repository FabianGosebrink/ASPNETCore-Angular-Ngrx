import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Configuration } from '../../shared/configuration/app.configuration';
import { FoodItem } from '../../shared/models/foodItem.model';
import { HttpWrapperService } from '../services/httpWrapper.service';

@Injectable()
export class FoodDataService {

    public actionUrl: string;

    constructor(private http: HttpWrapperService, private configuration: Configuration) {
        this.actionUrl = configuration.server + configuration.apiUrl + 'foods/';
    }

    GetAllFood = (): Observable<FoodItem[]> => {
        return this.http.get(this.actionUrl)
            .map((response: Response) => <FoodItem[]>response.json())
            .catch(this.handleError);
    }

    GetSingleFood = (id: string): Observable<FoodItem> => {
        return this.http.get(this.actionUrl + id)
            .map((response: Response) => <FoodItem>response.json())
            .catch(this.handleError);
    }

    AddFood = (foodItem: FoodItem): Observable<FoodItem> => {
        let toAdd: string = JSON.stringify(
            {
                name: foodItem.name,
                calories: foodItem.calories,
                type: foodItem.type,
                created: new Date()
            });

        let options = this.prepareOptions(null);

        return this.http.post(this.actionUrl, toAdd, options)
            .map((response: Response) => <FoodItem>response.json())
            .catch(this.handleError);
    }

    UpdateFood = (id: string, foodToUpdate: FoodItem): Observable<FoodItem> => {
        let options = this.prepareOptions(null);

        return this.http.put(this.actionUrl + id, JSON.stringify(foodToUpdate), options)
            .map((response: Response) => <FoodItem>response.json())
            .catch(this.handleError);
    }

    DeleteFood = (id: string): Observable<Response> => {
        return this.http.delete(this.actionUrl + id)
            .catch(this.handleError);
    }

    GetRandomMeal = (): Observable<FoodItem[]> => {
        return this.http.get(this.actionUrl + 'GetRandomMeal/')
            .map((response: Response) => <FoodItem[]>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


    private prepareOptions = (options: RequestOptionsArgs): RequestOptionsArgs => {
        options = options || {};

        if (!options.headers) {
            options.headers = new Headers();
        }

        options.headers.append('Content-Type', 'application/json');

        return options;
    }
}
