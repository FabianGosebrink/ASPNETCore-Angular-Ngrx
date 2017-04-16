import { Configuration } from './../configuration/app.configuration';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { FoodItem } from '../models/foodItem.model';

@Injectable()
export class FoodDataService {

    public actionUrl: string;

    constructor(private http: Http, private configuration: Configuration) {
        this.actionUrl = configuration.baseUrl + 'foods/';
    }

    GetAllFood = (): Observable<FoodItem[]> => {
        return this.http.get(this.actionUrl)
            .map((response: Response) => <FoodItem[]>response.json())
            .catch(this.handleError);
    }

    GetSingleFood = (id: string): Observable<FoodItem> => {
        console.log(this.actionUrl + id);
        return this.http.get(this.actionUrl + id)
            .map((response: Response) => <FoodItem>response.json())
            .catch(this.handleError);
    }

    GetRandomFood = (): Observable<FoodItem> => {
        return this.GetAllFood()
            .map((response: FoodItem[]) => {
                 let randomIndex = Math.floor(Math.random() * response.length);
                 return response[randomIndex];
            })
            .catch(this.handleError);
    }

    AddFood = (foodItem: FoodItem): Observable<FoodItem> => {
        let toAdd: string = JSON.stringify(
            {
                name: foodItem.name,
                calories: foodItem.calories,
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
