var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
var PlatformInformationProvider = (function () {
    function PlatformInformationProvider() {
        this.guessPlatform();
    }
    Object.defineProperty(PlatformInformationProvider.prototype, "isMobileDevice", {
        get: function () {
            return this._iOS || this._isAndroid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformInformationProvider.prototype, "isMobileWeb", {
        get: function () {
            return window.innerWidth <= 768;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformInformationProvider.prototype, "isWeb", {
        get: function () {
            return !this.isMobileDevice && !this.isElectron;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformInformationProvider.prototype, "isIOS", {
        get: function () {
            return this._iOS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformInformationProvider.prototype, "isAndroid", {
        get: function () {
            return this._isAndroid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformInformationProvider.prototype, "isElectron", {
        get: function () {
            return this._isElectron;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformInformationProvider.prototype, "userAgent", {
        get: function () {
            return this.getWindow().navigator.userAgent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformInformationProvider.prototype, "platformName", {
        get: function () {
            if (!this.getWindow().device) {
                return '';
            }
            return this.getWindow().device.platform + " " + this.getWindow().device.model;
        },
        enumerable: true,
        configurable: true
    });
    PlatformInformationProvider.prototype.guessPlatform = function () {
        this._iOS = this.getWindow().cordova && this.getWindow().cordova.platformId === 'ios';
        this._isAndroid = this.getWindow().cordova && this.getWindow().cordova.platformId === 'android';
        this._isElectron = this.getWindow().navigator.userAgent.match(/Electron/) !== null;
        console.log('userAgent: ' + this.getWindow().navigator.userAgent);
        console.log('mobile: ' + this.isMobileDevice);
        console.log('desktop: ' + this.isElectron);
        console.log('web: ' + this.isWeb);
    };
    PlatformInformationProvider.prototype.getWindow = function () {
        return window;
    };
    return PlatformInformationProvider;
}());
PlatformInformationProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], PlatformInformationProvider);
export { PlatformInformationProvider };
//# sourceMappingURL=platformInformation.provider.js.map