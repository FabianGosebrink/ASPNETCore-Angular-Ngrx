import { ToasterService } from 'angular2-toaster';

import { DesktopNotificationService } from './desktopNotification.service';
import { PlatformInformationProvider } from './platformInformation.provider';
import { WebAndMobileNotificationService } from './webAndMobileNotification.service';

export enum MessageType {
    Error,
    Info,
    Wait,
    Success,
    Warning
}

export function notificationFactory(toasterService: ToasterService): AbstractNotificationService {
    const platformProvider: PlatformInformationProvider = new PlatformInformationProvider();

    if (platformProvider.isElectron) {
        return new DesktopNotificationService();
    }

    return new WebAndMobileNotificationService(toasterService);
};

interface INotificationService {
    showNotification(type: MessageType, title: string, message: string, icon?: string): void;
}

export abstract class AbstractNotificationService implements INotificationService {
    abstract showNotification(type: MessageType, title: string, message: string, icon?: string): void;
}
