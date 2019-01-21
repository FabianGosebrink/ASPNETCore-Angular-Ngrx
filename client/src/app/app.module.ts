import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { ToasterModule } from 'angular2-toaster';
import { NgxElectronModule } from 'ngx-electron';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { CustomSerializer, reducers } from './store';
import { RegisterComponent } from './register/register.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { CustomersComponent} from './customers/customers.component'
//import { CustomersGridComponent} from './customers/crouter.component'
import { CustomerEditComponent} from './customers/customer-edit.component'
import { CustomerEditReactiveComponent} from './customers/customer-edit-reactive.component'
import { DataService } from './core/data-services/data.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
   // CustomersComponent,CustomerEditComponent,//CustomersGridComponent,CustomerEditReactiveComponent,
    BrowserModule,
    ToasterModule.forRoot(),
    RouterModule.forRoot(AppRoutes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
    }),
    SharedModule,
    NgxElectronModule,
    HomeModule,
    FormsModule,
    CoreModule.forRoot(),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule,
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer },DataService],
  declarations: [AppComponent, RegisterComponent,IngredientsComponent, CustomersComponent, CustomerEditComponent],

  bootstrap: [AppComponent],
})
export class AppModule {}
