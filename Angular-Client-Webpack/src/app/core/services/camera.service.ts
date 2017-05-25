import { MobileCameraService } from './mobileCamera.service';
import { PlatformInformationProvider } from './platformInformation.provider';
import { Observable } from 'rxjs/Observable';
import { DesktopCameraService } from './desktopCamera.service';

export function cameraFactory(): AbstractCameraService {
    let platformProvider: PlatformInformationProvider = new PlatformInformationProvider();

    if (platformProvider.isMobileDevice) {
        return new MobileCameraService();
    }

    return new DesktopCameraService();
};

interface ICameraService {
    getPhoto(): Observable<string>;
}

export abstract class AbstractCameraService implements ICameraService {
    abstract getPhoto(): Observable<string>;
}
