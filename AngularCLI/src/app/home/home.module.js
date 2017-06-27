var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var HomeModule = (function () {
    function HomeModule() {
    }
    return HomeModule;
}());
HomeModule = __decorate([
    NgModule({
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
        providers: [],
        exports: [
            HomeComponent
        ]
    })
], HomeModule);
export { HomeModule };
//# sourceMappingURL=home.module.js.map