import { AbstractNotificationService } from './abstract-notification.service';

declare let window: any;
export class MobileNotificationService implements AbstractNotificationService {
  private RGB_COLOR_ERROR = '#FF0000';
  private RGB_COLOR_SUCCESS = '#32CD32';
  private RGB_COLOR_NEUTRAL = '#333333';
  private RGB_COLOR_WARNING = '#FFA500';

  showError(title: string, message: string, icon?: string) {
    this.showNotification(this.RGB_COLOR_ERROR, message);
  }

  showInfo(title: string, message: string, icon?: string) {
    this.showNotification(this.RGB_COLOR_NEUTRAL, message);
  }

  showWait(title: string, message: string, icon?: string) {
    this.showNotification(this.RGB_COLOR_NEUTRAL, message);
  }

  showSuccess(title: string, message: string, icon?: string) {
    this.showNotification(this.RGB_COLOR_SUCCESS, message);
  }

  showWarning(title: string, message: string, icon?: string) {
    this.showNotification(this.RGB_COLOR_WARNING, message);
  }

  private showNotification(backgroundColor: string, message: string): void {
    window.plugins.toast.showWithOptions({
      message: message,
      duration: 'long', // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
      position: 'bottom',
      addPixelsY: -40, // added a negative value to move it up a bit (default 0),
      styling: {
        backgroundColor: backgroundColor, // '#FF0000' make sure you use #RRGGBB. Default #333333
      },
    });
  }
}
