import { ToastrService } from 'ngx-toastr';
import { AbstractNotificationService } from './abstract-notification.service';

export class WebNotificationService implements AbstractNotificationService {
  constructor(private toastr: ToastrService) {}

  showError(title: string, message: string, icon?: string) {
    this.toastr.error(message, title);
  }

  showInfo(title: string, message: string, icon?: string) {
    this.toastr.info(message, title);
  }

  showSuccess(title: string, message: string, icon?: string) {
    this.toastr.success(message, title);
  }

  showWarning(title: string, message: string, icon?: string) {
    this.toastr.warning(message, title);
  }
}
