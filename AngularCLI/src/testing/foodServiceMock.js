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
var http_1 = require('@angular/http');
var foodItem_1 = require('./../app/models/foodItem');
var Rx_1 = require('rxjs/Rx');
var core_1 = require('@angular/core');
var FoodServiceMock = (function () {
    function FoodServiceMock() {
        var _this = this;
        this.internalFoodList = [];
        this.GetAllFood = function () {
            return Rx_1.Observable.create(function (observer) {
                // Yield a single value and complete
                observer.next(_this.internalFoodList);
                observer.complete();
            });
        };
        this.GetSingleFood = function (id) {
            return Rx_1.Observable.create(function (observer) {
                // Yield a single value and complete
                observer.next(_this.internalFoodList.find(function (x) { return x.id === id; }));
                observer.complete();
            });
        };
        this.AddFood = function (foodItem) {
            return Rx_1.Observable.create(function (observer) {
                // Yield a single value and complete
                _this.internalFoodList.push(foodItem);
                observer.next(foodItem);
                observer.complete();
            });
        };
        this.UpdateFood = function (id, foodToUpdate) {
            return Rx_1.Observable.create(function (observer) {
                // Yield a single value and complete
                _this.internalFoodList.forEach(function (item) {
                    if (item.id === id) {
                        item = foodToUpdate;
                    }
                });
                observer.next(foodToUpdate);
                observer.complete();
            });
        };
        this.DeleteFood = function (id) {
            return Rx_1.Observable.create(function (observer) {
                var itemToRemove = _this.internalFoodList.find(function (x) { return x.id === id; });
                var indexToRemove = _this.internalFoodList.indexOf(itemToRemove);
                _this.internalFoodList.splice(indexToRemove, 1);
                observer.next(new http_1.Response(new http_1.ResponseOptions({
                    status: 204
                })));
                observer.complete();
            });
        };
        var fooditem = new foodItem_1.FoodItem();
        fooditem.id = 1;
        fooditem.created = new Date();
        fooditem.calories = 999;
        fooditem.name = 'FoodItem1';
        this.internalFoodList.push(fooditem);
    }
    FoodServiceMock = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FoodServiceMock);
    return FoodServiceMock;
}());
exports.FoodServiceMock = FoodServiceMock;
//# sourceMappingURL=foodServiceMock.js.map