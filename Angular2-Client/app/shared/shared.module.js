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
var food_data_service_1 = require('./services/food-data.service');
var router_1 = require('@angular/router');
var navigation_component_1 = require('./components/navigation/navigation.component');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule,
            providers: [food_data_service_1.FoodDataService]
        };
    };
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [
                // Modules
                common_1.CommonModule,
                router_1.RouterModule
            ],
            declarations: [
                // Components & directives
                navigation_component_1.NavigationComponent
            ],
            providers: [],
            exports: [
                navigation_component_1.NavigationComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map