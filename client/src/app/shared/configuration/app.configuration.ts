import { Injectable } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster/angular2-toaster';

import { environment } from '../../../environments/environment';

@Injectable()
export class Configuration {
    // server = environment.production ? 'http://foodapi4demo.azurewebsites.net/' : 'http://localhost:5000/';
    // server = 'http://foodapi4demo.azurewebsites.net/';
    server = 'http://localhost:5000/';
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
