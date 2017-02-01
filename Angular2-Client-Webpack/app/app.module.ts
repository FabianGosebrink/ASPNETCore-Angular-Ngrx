import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { HomeComponent } from './home/components/home/home.component';
import { Configuration } from './shared/configuration/app.configuration';
import { FoodModule } from './food/food.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routes';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes),
        HttpModule,
        FormsModule,
        SharedModule.forRoot(),
        HomeModule,
        FoodModule
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
