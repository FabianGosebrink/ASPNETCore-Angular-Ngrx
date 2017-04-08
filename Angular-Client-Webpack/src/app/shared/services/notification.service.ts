import { Injectable } from '@angular/core';
import { PlatformInformationProvider } from './platformInformation.provider';
import { ToasterService } from 'angular2-toaster';
import { WebAndMobileNotificationService } from './webAndMobileNotification.service';
import { DesktopNotificationService } from './desktopNotification.service';

export enum MessageType {
    Error,
    Info,
    Wait,
    Success,
    Warning
}

export function notificationFactory(toasterService: ToasterService): AbstractNotificationService {
    let platformProvider: PlatformInformationProvider = new PlatformInformationProvider();

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
