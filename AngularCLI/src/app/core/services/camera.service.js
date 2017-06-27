import { DesktopCameraService } from './desktopCamera.service';
import { MobileCameraService } from './mobileCamera.service';
import { PlatformInformationProvider } from './platformInformation.provider';
export function cameraFactory() {
    var platformProvider = new PlatformInformationProvider();
    if (platformProvider.isMobileDevice) {
        return new MobileCameraService();
    }
    return new DesktopCameraService();
}
;
var AbstractCameraService = (function () {
    function AbstractCameraService() {
    }
    return AbstractCameraService;
}());
export { AbstractCameraService };
//# sourceMappingURL=camera.service.js.map