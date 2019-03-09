import { Injectable } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';

@Injectable()
export class Configuration {
  title = 'Jenny 2020';

  authConfig = {
    CLIENT_ID: 'AngularFoodClient',
    GRANT_TYPE: 'password',
    SCOPE: 'WebAPI'
  };

  toasterConfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right'
  });
}
