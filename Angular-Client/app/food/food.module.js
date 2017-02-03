"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var filter_pipe_1 = require('./pipes/filter.pipe');
var isNumber_validator_1 = require('./validators/isNumber.validator');
var isInRange_validator_1 = require('./validators/isInRange.validator');
var mainFood_component_1 = require('./components/mainFood/mainFood.component');
var foodForm_component_1 = require('./components/foodForm/foodForm.component');
var foodDetails_component_1 = require('./components/foodDetails/foodDetails.component');
var foodList_component_1 = require('./components/foodList/foodList.component');
var forms_1 = require('@angular/forms');
var food_routes_1 = require('./food.routes');
var router_1 = require('@angular/router');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var FoodModule = (function () {
    function FoodModule() {
    }
    FoodModule = __decorate([
        core_1.NgModule({
            imports: [
                // Modules
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule.forChild(food_routes_1.FoodRoutes)
            ],
            declarations: [
                // Components & Directives
                foodList_component_1.FoodListComponent,
                foodDetails_component_1.FoodDetailsComponent,
                foodForm_component_1.FoodFormComponent,
                mainFood_component_1.MainFoodComponent,
                isInRange_validator_1.IsInRangeValidator,
                isNumber_validator_1.IsNumberValidator,
                filter_pipe_1.FilterPipe
            ],
            providers: [],
            exports: []
        }), 
        __metadata('design:paramtypes', [])
    ], FoodModule);
    return FoodModule;
}());
exports.FoodModule = FoodModule;
//# sourceMappingURL=food.module.js.map