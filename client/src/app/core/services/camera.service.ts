import { Observable } from 'rxjs';
import { DesktopCameraService } from './desktopCamera.service';
import { MobileCameraService } from './mobileCamera.service';
import { PlatformInformationProvider } from './platformInformation.provider';

export function cameraFactory(): AbstractCameraService {
  const platformProvider: PlatformInformationProvider = new PlatformInformationProvider();

  if (platformProvider.isMobileDevice) {
    return new MobileCameraService();
  }

  return new DesktopCameraService();
}

interface ICameraService {
  getPhoto(): Observable<string>;
}

export abstract class AbstractCameraService implements ICameraService {
  abstract getPhoto(): Observable<string>;
}
