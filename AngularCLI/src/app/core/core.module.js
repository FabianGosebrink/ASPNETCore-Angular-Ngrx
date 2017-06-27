var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { FoodDataService } from './data-services/food-data.service';
import { AuthenticationService } from './services/authentication.service';
import { AbstractCameraService, cameraFactory } from './services/camera.service';
import { CpuValueService } from './services/cpuValue.service';
import { CurrentUserService } from './services/currentUser.service';
import { HttpWrapperService } from './services/httpWrapper.service';
import { AbstractNotificationService, notificationFactory } from './services/notification.service';
import { PlatformInformationProvider } from './services/platformInformation.provider';
import { Sorter } from './services/sort.service';
import { StorageService } from './services/storage.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
var CoreModule = CoreModule_1 = (function () {
    function CoreModule() {
    }
    CoreModule.forRoot = function () {
        return {
            ngModule: CoreModule_1,
            providers: [
                FoodDataService,
                Sorter,
                AuthenticationService,
                HttpWrapperService,
                StorageService,
                CurrentUserService,
                PlatformInformationProvider,
                CpuValueService,
                {
                    provide: AbstractNotificationService,
                    useFactory: notificationFactory,
                    deps: [ToasterService]
                },
                {
                    provide: AbstractCameraService,
                    useFactory: cameraFactory
                }
            ]
        };
    };
    return CoreModule;
}());
CoreModule = CoreModule_1 = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [],
        declarations: [],
        providers: [],
    })
], CoreModule);
export { CoreModule };
var CoreModule_1;
//# sourceMappingURL=core.module.js.map