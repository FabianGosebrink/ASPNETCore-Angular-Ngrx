export enum MessageType {
  Error,
  Info,
  Wait,
  Success,
  Warning
}

interface INotificationService {
  showNotification(
    type: MessageType,
    title: string,
    message: string,
    icon?: string
  ): void;
}

export abstract class AbstractNotificationService
  implements INotificationService {
  abstract showNotification(
    type: MessageType,
    title: string,
    message: string,
    icon?: string
  ): void;
}
