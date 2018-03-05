import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';
import { NgxElectronModule } from 'ngx-electron';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { reducers, CustomSerializer } from './store';

import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ToasterModule.forRoot(),
    RouterModule.forRoot(AppRoutes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    }),
    SharedModule,
    NgxElectronModule,
    HomeModule,
    CoreModule.forRoot(),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  declarations: [AppComponent],

  bootstrap: [AppComponent]
})
export class AppModule {}
