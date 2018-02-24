import { Injectable } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster/angular2-toaster';

@Injectable()
export class Configuration {
  title = 'eMeal';

  authConfig = {
    CLIENT_ID: 'AngularFoodClient',
    GRANT_TYPE: 'password',
    SCOPE: 'WebAPI'
  };

  toasterConfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right'
  });
}
