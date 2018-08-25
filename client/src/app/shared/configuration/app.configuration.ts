import { Injectable } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';
import { PlatformInformationProvider } from '../../core/services/platform-information.provider';

@Injectable()
export class Configuration {
  title = 'eMeal';
  constructor(
    private readonly platformInformationProvider: PlatformInformationProvider
  ) {}

  authConfig = {
    CLIENT_ID: 'AngularFoodClient',
    GRANT_TYPE: 'password',
    SCOPE: 'WebAPI',
  };

  toasterConfig: ToasterConfig = new ToasterConfig({
    positionClass: this.platformInformationProvider.isWeb
      ? 'toast-bottom-right'
      : 'toast-bottom-full-width',
  });
}
