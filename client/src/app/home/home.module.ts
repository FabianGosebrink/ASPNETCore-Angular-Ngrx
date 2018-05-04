import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { EMealFooterComponent } from './footer/eMeal-footer.component';
import { HomeRoutes } from './home.routes';
import { HomeComponent } from './home/home.component';
import { RandomMealComponent } from './randomMeal/randomMeal.component';
import { SingleMealComponent } from './single-meal/single-meal.component';
import { effects, reducers } from './store';

@NgModule({
  imports: [
    // Modules
    CommonModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forChild(HomeRoutes),
    StoreModule.forFeature('home', reducers),
    EffectsModule.forFeature(effects)
  ],

  declarations: [
    // Components & Directives
    HomeComponent,
    RandomMealComponent,
    EMealFooterComponent,
    SingleMealComponent
  ],

  providers: [
    // Services
  ],

  exports: [HomeComponent]
})
export class HomeModule {}
