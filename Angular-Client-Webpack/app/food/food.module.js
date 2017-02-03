var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { FilterPipe } from './pipes/filter.pipe';
import { IsNumberValidator } from './validators/isNumber.validator';
import { IsInRangeValidator } from './validators/isInRange.validator';
import { MainFoodComponent } from './components/mainFood/mainFood.component';
import { FoodFormComponent } from './components/foodForm/foodForm.component';
import { FoodDetailsComponent } from './components/foodDetails/foodDetails.component';
import { FoodListComponent } from './components/foodList/foodList.component';
import { FormsModule } from '@angular/forms';
import { FoodRoutes } from './food.routes';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export var FoodModule = (function () {
    function FoodModule() {
    }
    FoodModule = __decorate([
        NgModule({
            imports: [
                // Modules
                CommonModule,
                FormsModule,
                RouterModule.forChild(FoodRoutes)
            ],
            declarations: [
                // Components & Directives
                FoodListComponent,
                FoodDetailsComponent,
                FoodFormComponent,
                MainFoodComponent,
                IsInRangeValidator,
                IsNumberValidator,
                FilterPipe
            ],
            providers: [],
            exports: []
        }), 
        __metadata('design:paramtypes', [])
    ], FoodModule);
    return FoodModule;
}());
//# sourceMappingURL=food.module.js.map