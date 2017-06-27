var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { MessageType } from './notification.service';
import { Injectable } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
var WebAndMobileNotificationService = (function () {
    function WebAndMobileNotificationService(toasterService) {
        this.toasterService = toasterService;
    }
    WebAndMobileNotificationService.prototype.showNotification = function (type, title, message, icon) {
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
    };
    return WebAndMobileNotificationService;
}());
WebAndMobileNotificationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ToasterService])
], WebAndMobileNotificationService);
export { WebAndMobileNotificationService };
//# sourceMappingURL=webAndMobileNotification.service.js.map