import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FoodDataService } from './data-services/food-data.service';
import { Sorter } from './services/sort.service';
import { WebAndMobileNotificationService } from './services/webAndMobileNotification.service';
import { DesktopNotificationService } from './services/desktopNotification.service';
import { PlatformInformationProvider } from './services/platformInformation.provider';
import { AbstractNotificationService, notificationFactory } from './services/notification.service';
import { ToasterService } from 'angular2-toaster';
import { CurrentUserService } from './services/currentUser.service';
import { AuthenticationService } from './services/authentication.service';
import { HttpWrapperService } from './services/httpWrapper.service';
import { StorageService } from './services/storage.service';
import { CpuValueService } from './services/cpuValue.service';

@NgModule({
    imports: [CommonModule],
    exports: [],
    declarations: [],
    providers: [
        // see below
    ],
})

export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
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
                }]
        };
    }
}
