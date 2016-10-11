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
var core_1 = require('@angular/core');
var food_dataservice_1 = require('../../shared/food.dataservice');
var foodItem_1 = require('../../models/foodItem');
var MainFoodComponent = (function () {
    function MainFoodComponent(_foodDataService) {
        var _this = this;
        this._foodDataService = _foodDataService;
        this.getFood = function () {
            _this._foodDataService
                .GetAllFood()
                .subscribe(function (response) {
                _this.foods = response;
            }, function (error) { return console.log(error); }, function () { return console.log(_this.foods); });
        };
        this.setCurrentlySelectedFood(new foodItem_1.FoodItem());
        this._foodDataService.foodAdded.subscribe(function () { return _this.getFood(); });
        this._foodDataService.foodDeleted.subscribe(function () { return _this.getFood(); });
    }
    MainFoodComponent.prototype.ngOnInit = function () {
        this.getFood();
    };
    MainFoodComponent.prototype.setCurrentlySelectedFood = function (foodItem) {
        this.foodSelectedFromList = foodItem;
    };
    MainFoodComponent = __decorate([
        core_1.Component({
            selector: 'mainFood-component',
            providers: [food_dataservice_1.FoodDataService],
            templateUrl: 'app/components/mainFood/mainFood.component.html'
        }), 
        __metadata('design:paramtypes', [food_dataservice_1.FoodDataService])
    ], MainFoodComponent);
    return MainFoodComponent;
}());
exports.MainFoodComponent = MainFoodComponent;
//# sourceMappingURL=mainFood.component.js.map