import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { Configuration } from './shared/app.configuration';
import { routing, appRoutingProviders } from './app.routes';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './modules/shared.module';

import { HomeComponent } from  './components/home/home.component';
import { MainFoodComponent } from  './components/mainFood/mainFood.component';
import { FoodDetailsComponent } from './components/foodDetails/foodDetails.component';
import { FoodListComponent } from './components/foodList/foodList.component';
import { FoodFormComponent } from './components/foodForm/foodForm.component';

import { FoodDataService } from './shared/food.dataservice';


@NgModule({
    imports: [
        BrowserModule,
        routing,
        HttpModule,
        JsonpModule,
        FormsModule,
        SharedModule
    ],

    declarations: [
        AppComponent,
        HomeComponent,
        MainFoodComponent,
        FoodDetailsComponent,
        FoodListComponent,
        FoodFormComponent
    ],

    providers: [
        appRoutingProviders,
        Configuration,
        FoodDataService
    ],

    bootstrap: [AppComponent]
})

export class AppModule { }