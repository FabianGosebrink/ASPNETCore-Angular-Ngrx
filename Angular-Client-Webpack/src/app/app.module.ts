import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { Configuration } from './shared/configuration/app.configuration';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { AppRoutes } from './app.routes';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';
import { NgxElectronModule } from 'ngx-electron';

@NgModule({
    imports: [
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

    providers: [
        Configuration
    ],

    bootstrap: [AppComponent]
})

export class AppModule { }
