import { Injectable } from '@angular/core';

const APP_PREFIX = 'OS-';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage;

  static loadInitialState() {
    const isAuthenticated = localStorage.getItem(`${APP_PREFIX}auth`);

    return {
      isAuthenticated: !!isAuthenticated,
      pending: false,
      signalRConnectionEstablished: false,
    };
  }

  constructor() {
    this._storage = localStorage;
  }

  setItem(key: string, value: any): void {
    this._storage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
  }

  removeItem(key: string): void {
    this._storage.removeItem(`${APP_PREFIX}${key}`);
  }

  getItem(key: string): any {
    return JSON.parse(localStorage.getItem(`${APP_PREFIX}${key}`));
  }
}
