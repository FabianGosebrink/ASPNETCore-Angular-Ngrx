import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HomeEffects } from 'app/home/store/effects/home.effects';
import { foodItemsHomeReducer } from 'app/home/store/reducers/home.reducer';

import { SharedModule } from '../shared/shared.module';
import { EMealFooterComponent } from './footer/eMeal-footer.component';
import { HomeRoutes } from './home.routes';
import { HomeComponent } from './home/home.component';
import { RandomMealComponent } from './randomMeal/randomMeal.component';
import { SneakPeekComponent } from './sneakPeek/sneekPeek.component';

@NgModule({
    imports: [
        // Modules
        CommonModule,
        FormsModule,
        HttpClientModule,
        SharedModule,
        RouterModule.forChild(HomeRoutes),
        StoreModule.forFeature('home', {
            homeFoodItems: foodItemsHomeReducer,
        }),
        EffectsModule.forFeature([HomeEffects])
    ],

    declarations: [
        // Components & Directives
        HomeComponent,
        RandomMealComponent,
        SneakPeekComponent,
        EMealFooterComponent
    ],

    providers: [
        // Services
    ],

    exports: [
        HomeComponent
    ]
})

export class HomeModule { }
