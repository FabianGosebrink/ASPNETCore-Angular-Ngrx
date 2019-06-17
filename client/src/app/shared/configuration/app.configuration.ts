import { Injectable } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';

@Injectable()
export class Configuration {
  title = 'eMeal';

  toasterConfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
  });
}
