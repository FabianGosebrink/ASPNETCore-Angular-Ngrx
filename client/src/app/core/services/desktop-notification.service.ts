import { AbstractNotificationService } from './abstract-notification.service';

export class DesktopNotificationService implements AbstractNotificationService {
  showError(title: string, message: string, icon?: string) {
    this.showNotification('Error', title, message, icon);
  }

  showInfo(title: string, message: string, icon?: string) {
    this.showNotification('Info', title, message, icon);
  }

  showWait(title: string, message: string, icon?: string) {
    this.showNotification('Wait', title, message, icon);
  }

  showSuccess(title: string, message: string, icon?: string) {
    this.showNotification('Success', title, message, icon);
  }

  showWarning(title: string, message: string, icon?: string) {
    this.showNotification('Warning', title, message, icon);
  }

  private showNotification(
    type: string,
    title: string,
    message: string,
    icon?: string
  ): void {
    if (!Notification) {
      alert(
        'Desktop notifications not available in your browser. Try Chromium.'
      );
      return;
    }

    const messageBody: NotificationOptions = {};

    messageBody.body = message;

    if (icon) {
      messageBody.icon = icon;
    }

    const titleToShow = `${type} : ${title}`;

    Notification.requestPermission().then(() => {
      const myNotification = new Notification(titleToShow, messageBody);
    });
  }
}
