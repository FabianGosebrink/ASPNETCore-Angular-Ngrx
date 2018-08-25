import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DesktopCameraService } from './desktop-camera.service';
import { MobileCameraService } from './mobile-camera.service';
import { PlatformInformationProvider } from './platform-information.provider';

export function cameraFactory(
  platformProvider: PlatformInformationProvider
): AbstractCameraService {
  if (platformProvider.isMobileDevice) {
    return new MobileCameraService();
  }

  return new DesktopCameraService();
}

interface ICameraService {
  getPhoto(): Observable<string>;
}

@Injectable({
  providedIn: 'root',
  useFactory: cameraFactory,
  deps: [PlatformInformationProvider],
})
export abstract class AbstractCameraService implements ICameraService {
  abstract getPhoto(): Observable<string>;
}
