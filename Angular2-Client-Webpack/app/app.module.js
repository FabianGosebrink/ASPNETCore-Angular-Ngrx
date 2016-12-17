var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { Configuration } from './shared/app.configuration';
import { AppRoutes } from './app.routes';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './modules/shared.module';
import { HomeComponent } from './components/home/home.component';
import { MainFoodComponent } from './components/mainFood/mainFood.component';
import { FoodDetailsComponent } from './components/foodDetails/foodDetails.component';
import { FoodListComponent } from './components/foodList/foodList.component';
import { FoodFormComponent } from './components/foodForm/foodForm.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FoodDataService } from './shared/food.dataservice';
export var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            imports: [
                BrowserModule,
                RouterModule.forRoot(AppRoutes),
                HttpModule,
                FormsModule,
                SharedModule
            ],
            declarations: [
                AppComponent,
                HomeComponent,
                MainFoodComponent,
                FoodDetailsComponent,
                FoodListComponent,
                FoodFormComponent,
                NavigationComponent
            ],
            providers: [
                Configuration,
                FoodDataService
            ],
            bootstrap: [AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
