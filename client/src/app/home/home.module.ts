import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HomeEffects } from 'app/home/store/effects/home.effects';
import { effects, reducers } from './store';

import { SharedModule } from '../shared/shared.module';
import { EMealFooterComponent } from './footer/eMeal-footer.component';
import { HomeRoutes } from './home.routes';
import { HomeComponent } from './home/home.component';
import { RandomMealComponent } from './randomMeal/randomMeal.component';
import { SneakPeekComponent } from './sneakPeek/sneekPeek.component';
import { SingleMealComponent } from './single-meal/single-meal.component';

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
    SneakPeekComponent,
    EMealFooterComponent,
    SingleMealComponent
  ],

  providers: [
    // Services
  ],

  exports: [HomeComponent]
})
export class HomeModule {}
