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
var foodItem_1 = require('./../../../shared/models/foodItem');
var food_data_service_1 = require('./../../../shared/services/food-data.service');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var FoodDetailsComponent = (function () {
    function FoodDetailsComponent(_route, _foodDataService) {
        this._route = _route;
        this._foodDataService = _foodDataService;
        this.selectedFoodItem = new foodItem_1.FoodItem();
    }
    FoodDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.forEach(function (params) {
            var id = +params['foodId'];
            _this._foodDataService
                .GetSingleFood(id)
                .subscribe(function (foodItem) {
                _this.selectedFoodItem = foodItem;
            }, function (error) { return console.log(error); });
        });
    };
    FoodDetailsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'foodDetails-component',
            templateUrl: './foodDetails.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, food_data_service_1.FoodDataService])
    ], FoodDetailsComponent);
    return FoodDetailsComponent;
}());
exports.FoodDetailsComponent = FoodDetailsComponent;
//# sourceMappingURL=foodDetails.component.js.map