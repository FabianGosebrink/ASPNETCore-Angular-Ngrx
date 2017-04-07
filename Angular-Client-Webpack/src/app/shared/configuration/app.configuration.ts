import { Injectable } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster/angular2-toaster';

@Injectable()
export class Configuration {
    baseUrl: string = 'http://foodapi4demo.azurewebsites.net/api/';
    // baseUrl: string = "http://localhost:5000/api/";
    title: string = 'Angular FoodChooser';

    public toasterConfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right'
    });
}
