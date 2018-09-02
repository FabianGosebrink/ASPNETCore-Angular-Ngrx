import { Injectable } from '@angular/core';
import { AbstractNotificationService } from './abstract-notification.service';

declare let window: any;

@Injectable({ providedIn: 'root' })
export class CordovaEventService {
  constructor(
    private readonly notificationService: AbstractNotificationService
  ) {
    this.checkCamera();
    this.checkToast();
  }

  private checkCamera() {
    if (!window.navigator.camera) {
      this.notificationService.showInfo(
        'Cordova camera',
        'Camera could not be initialised'
      );
      return;
    }
  }

  private checkToast() {
    if (!window.plugins.toast) {
      this.notificationService.showInfo(
        'Cordova toast',
        'Toast could not be initialised'
      );
      return;
    }
  }
}
