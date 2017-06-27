import { DesktopNotificationService } from './desktopNotification.service';
import { PlatformInformationProvider } from './platformInformation.provider';
import { WebAndMobileNotificationService } from './webAndMobileNotification.service';
export var MessageType;
(function (MessageType) {
    MessageType[MessageType["Error"] = 0] = "Error";
    MessageType[MessageType["Info"] = 1] = "Info";
    MessageType[MessageType["Wait"] = 2] = "Wait";
    MessageType[MessageType["Success"] = 3] = "Success";
    MessageType[MessageType["Warning"] = 4] = "Warning";
})(MessageType || (MessageType = {}));
export function notificationFactory(toasterService) {
    var platformProvider = new PlatformInformationProvider();
    if (platformProvider.isElectron) {
        return new DesktopNotificationService();
    }
    return new WebAndMobileNotificationService(toasterService);
}
;
var AbstractNotificationService = (function () {
    function AbstractNotificationService() {
    }
    return AbstractNotificationService;
}());
export { AbstractNotificationService };
//# sourceMappingURL=notification.service.js.map