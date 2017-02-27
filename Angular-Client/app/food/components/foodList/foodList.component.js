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
var sort_service_1 = require('./../../../shared/services/sort.service');
var core_1 = require('@angular/core');
var FoodListComponent = (function () {
    function FoodListComponent(sorter) {
        var _this = this;
        this.sorter = sorter;
        this.foodSelected = new core_1.EventEmitter();
        this.foodDeleted = new core_1.EventEmitter();
        this.setFoodItemForEdit = function (foodItem) {
            _this.foodSelected.emit(foodItem);
        };
        this.deleteFood = function (foodItem) {
            _this.foodDeleted.emit(foodItem);
        };
        this.setFoodToDelete = function (foodItem) {
            _this.foodToDelete = foodItem;
        };
    }
    FoodListComponent.prototype.sortArray = function (key) {
        this.sorter.sort(key, this.foods);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], FoodListComponent.prototype, "foods", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FoodListComponent.prototype, "foodSelected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FoodListComponent.prototype, "foodDeleted", void 0);
    FoodListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'foodlist',
            templateUrl: './foodList.component.html'
        }), 
        __metadata('design:paramtypes', [sort_service_1.Sorter])
    ], FoodListComponent);
    return FoodListComponent;
}());
exports.FoodListComponent = FoodListComponent;
//# sourceMappingURL=foodList.component.js.map