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
var food_data_service_1 = require('./../../../shared/services/food-data.service');
var core_1 = require('@angular/core');
var HomeComponent = (function () {
    function HomeComponent(_foodDataService) {
        var _this = this;
        this._foodDataService = _foodDataService;
        this.isWorking = false;
        this.updateFood = function () {
            _this.getFood();
        };
        this.getFood = function () {
            _this.isWorking = true;
            _this._foodDataService
                .GetAllFood()
                .subscribe(function (response) {
                var foodItems = response;
                var randomIndex = Math.floor(Math.random() * foodItems.length);
                _this.selectedFood = foodItems[randomIndex];
                _this.lastUpdatedDate = new Date();
            }, function (error) { return console.log(error); }, function () { return _this.isWorking = false; });
        };
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.getFood();
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home-component',
            templateUrl: './home.component.html'
        }), 
        __metadata('design:paramtypes', [food_data_service_1.FoodDataService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map