import { AbstractNotificationService, MessageType } from './notification.service';
import { Injectable } from '@angular/core';
import { ToasterService } from 'angular2-toaster';

@Injectable()
export class WebAndMobileNotificationService implements AbstractNotificationService {

    constructor(private toasterService: ToasterService) {

    }

    showNotification(type: MessageType, title: string, message: string, icon?: string): void {

        switch (+type) {
            case MessageType.Error:
                this.toasterService.pop('error', title, message);
                break;

            case MessageType.Info:
                this.toasterService.pop('info', title, message);
                break;

            case MessageType.Wait:
                this.toasterService.pop('wait', title, message);
                break;

            case MessageType.Success:
                this.toasterService.pop('success', title, message);
                break;

            case MessageType.Warning:
                this.toasterService.pop('warning', title, message);
                break;
            default:
                this.toasterService.pop('info', 'Whut?', 'Can not get message type');
        }
    }
}