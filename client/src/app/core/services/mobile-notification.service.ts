import { ToasterService } from 'angular2-toaster';
import { AbstractNotificationService } from './abstract-notification.service';

declare let window: any;
export class MobileNotificationService implements AbstractNotificationService {
  constructor(private toasterService: ToasterService) {}

  showError(title: string, message: string, icon?: string) {
    this.showNotification('error', title, message, icon);
  }

  showInfo(title: string, message: string, icon?: string) {
    this.showNotification('info', title, message, icon);
  }

  showWait(title: string, message: string, icon?: string) {
    this.showNotification('wait', title, message, icon);
  }

  showSuccess(title: string, message: string, icon?: string) {
    this.showNotification('success', title, message, icon);
  }

  showWarning(title: string, message: string, icon?: string) {
    this.showNotification('warning', title, message, icon);
  }

  private showNotification(
    type: string,
    title: string,
    message: string,
    icon?: string
  ): void {
    window.plugins.toast.showWithOptions({
      message: 'hey there',
      duration: 'short', // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
      position: 'bottom',
      addPixelsY: -40, // added a negative value to move it up a bit (default 0)
    });
  }
}
