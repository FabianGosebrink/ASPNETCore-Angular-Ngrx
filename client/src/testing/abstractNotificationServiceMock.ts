import { MessageType } from '../app/core/services/notification.service';

export class AbstractNotificationServiceStub {
  showNotification(
    type: MessageType,
    title: string,
    message: string,
    icon?: string
  ): void {}
}
