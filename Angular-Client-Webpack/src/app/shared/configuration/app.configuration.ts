import { Injectable } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster/angular2-toaster';

@Injectable()
export class Configuration {
    baseUrl = 'http://foodapi4demo.azurewebsites.net/api/';
    // baseUrl = 'http://localhost:5000/api/';
    title = 'Angular FoodChooser';

    toasterConfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right'
    });
}
