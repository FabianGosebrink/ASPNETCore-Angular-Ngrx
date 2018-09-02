import { Injectable } from '@angular/core';

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
    return this.getWindow().navigator.userAgent;
  }

  get platformName(): any {
    if (!this.getWindow().device) {
      return '';
    }
    return `${this.getWindow().device.platform} ${
      this.getWindow().device.model
    }`;
  }

  constructor() {
    this.guessPlatform();
  }

  private guessPlatform(): void {
    this._iOS =
      this.getWindow().cordova && this.getWindow().cordova.platformId === 'ios';
    this._isAndroid =
      this.getWindow().cordova &&
      this.getWindow().cordova.platformId === 'android';
  }

  private getWindow(): any {
    return window;
  }
}
