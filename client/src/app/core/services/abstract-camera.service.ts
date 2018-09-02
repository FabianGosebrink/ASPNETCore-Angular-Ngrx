import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DesktopCameraService } from './desktop-camera.service';
import { MobileCameraService } from './mobile-camera.service';

export function cameraFactory(): AbstractCameraService {
  return environment.mobile
    ? new MobileCameraService()
    : new DesktopCameraService();
}

interface ICameraService {
  getPhoto(): Observable<string>;
}

@Injectable({
  providedIn: 'root',
  useFactory: cameraFactory,
})
export abstract class AbstractCameraService implements ICameraService {
  abstract getPhoto(): Observable<string>;
}
