import { ToasterService } from 'angular2-toaster';
import { AbstractNotificationService } from './abstract-notification.service';

export class WebNotificationService implements AbstractNotificationService {
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
    this.toasterService.pop(type, title, message);
  }
}
