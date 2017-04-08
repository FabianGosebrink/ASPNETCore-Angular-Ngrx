import { FoodDataService } from './services/food-data.service';
import { Sorter } from './services/sort.service';
import { AbstractNotificationService, notificationFactory } from './services/notification.service';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformInformationProvider } from './services/platformInformation.provider';
import { ToasterService } from 'angular2-toaster';

@NgModule({
    imports: [
        // Modules
        CommonModule,
        RouterModule
    ],

    declarations: [
        // Components & directives
        NavigationComponent
    ],

    providers: [
        // Services
    ],

    exports: [
        NavigationComponent
    ]
})

export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                FoodDataService,
                Sorter,
                PlatformInformationProvider,
                {
                    provide: AbstractNotificationService,
                    useFactory: notificationFactory,
                    deps: [ToasterService]
                }]
        };
    }
}

