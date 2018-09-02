import { Injectable } from '@angular/core';

declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class PlatformInformationProvider {
  private _iOS: boolean;
  private _isAndroid: boolean;

  get isMobileWeb(): boolean {
    return window.innerWidth <= 768;
  }

  get isIOS(): boolean {
    return this._iOS;
  }

  get isAndroid(): boolean {
    return this._isAndroid;
  }

  get userAgent(): boolean {
    return window.navigator.userAgent;
  }

  get platformName(): any {
    if (!window.device) {
      return 'No window.device';
    }
    return `${window.device.platform} ${window.device.model}`;
  }

  constructor() {
    this.guessPlatform();
  }

  private guessPlatform(): void {
    this._iOS = window.cordova && window.cordova.platformId === 'ios';
    this._isAndroid = window.cordova && window.cordova.platformId === 'android';
  }
}
