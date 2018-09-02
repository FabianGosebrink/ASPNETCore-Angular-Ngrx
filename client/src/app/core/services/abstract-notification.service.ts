import { Injectable } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { environment } from '../../../environments/environment';
import { MobileNotificationService } from './mobile-notification.service';
import { WebNotificationService } from './web-notification.service';

export function notificationFactory(
  toasterService: ToasterService
): AbstractNotificationService {
  if (environment.desktop) {
    // return new DesktopNotificationService();
    return new WebNotificationService(toasterService);
  }

  if (environment.mobile) {
    return new MobileNotificationService();
  }

  return new WebNotificationService(toasterService);
}

@Injectable({
  providedIn: 'root',
  useFactory: notificationFactory,
  deps: [ToasterService],
})
export abstract class AbstractNotificationService
  implements INotificationService {
  abstract showError(title: string, message: string, icon?: string);

  abstract showInfo(title: string, message: string, icon?: string);

  abstract showWait(title: string, message: string, icon?: string);

  abstract showSuccess(title: string, message: string, icon?: string);

  abstract showWarning(title: string, message: string, icon?: string);
}

export interface INotificationService {
  showError(title: string, message: string, icon?: string);

  showInfo(title: string, message: string, icon?: string);

  showWait(title: string, message: string, icon?: string);

  showSuccess(title: string, message: string, icon?: string);

  showWarning(title: string, message: string, icon?: string);
}
