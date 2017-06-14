import { EMealFooterComponent } from './components/footer/eMeal-footer.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { RandomMealComponent } from './components/randomMeal/randomMeal.component';
import { SneakPeekComponent } from './components/sneakPeek/sneekPeek.component';
import { HomeRoutes } from './home.routes';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

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