import { Injectable } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster/angular2-toaster';

@Injectable()
export class Configuration {
    server = 'http://localhost:5000/';
    // server = 'http://foodapi4demo.azurewebsites.net/';
    apiUrl = 'api/';
    title = 'eMeal';

    authConfig = {
        CLIENT_ID: 'AngularFoodClient',
        GRANT_TYPE: 'password',
        SCOPE: 'WebAPI'
    }

    toasterConfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right'
    });
}
