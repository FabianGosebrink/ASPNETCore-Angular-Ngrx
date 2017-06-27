import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { Configuration } from './shared/configuration/app.configuration';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';
import { NgxElectronModule } from 'ngx-electron';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        ToasterModule,
        RouterModule.forRoot(AppRoutes, { useHash: true, preloadingStrategy: PreloadAllModules }),
        SharedModule,
        NgxElectronModule,

        HomeModule,
        CoreModule.forRoot()
    ],

    declarations: [
        AppComponent
    ],

    bootstrap: [AppComponent]
})

export class AppModule { }
