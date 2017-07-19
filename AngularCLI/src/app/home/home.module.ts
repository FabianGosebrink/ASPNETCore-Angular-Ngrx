import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
        RouterModule.forChild(HomeRoutes)
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
