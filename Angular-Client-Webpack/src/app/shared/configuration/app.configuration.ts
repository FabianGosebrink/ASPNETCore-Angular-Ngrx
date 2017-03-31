import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    baseUrl: string = 'http://foodapi4demo.azurewebsites.net/api/';
    // baseUrl: string = "http://localhost:5000/api/";
    title: string = 'Angular FoodChooser';
}
