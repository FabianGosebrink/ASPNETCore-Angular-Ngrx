import { HomeComponent } from './components/home/home.component';
import { HomeRoutes } from './home.routes';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HttpModule } from '@angular/http';
import {RandomMealComponent} from './components/randomMeal/randomMeal.component';

@NgModule({
    imports: [
        // Modules
        CommonModule,
        FormsModule,
        HttpModule,
        SharedModule,
        RouterModule.forChild(HomeRoutes)
    ],

    declarations: [
        // Components & Directives
        HomeComponent,
        RandomMealComponent
    ],

    providers: [
        // Services
    ],

    exports: [
        HomeComponent
    ]
})

export class HomeModule { }