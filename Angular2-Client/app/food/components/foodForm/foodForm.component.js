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
var core_1 = require('@angular/core');
var FoodFormComponent = (function () {
    function FoodFormComponent() {
        var _this = this;
        this.foodUpdated = new core_1.EventEmitter();
        this.foodAdded = new core_1.EventEmitter();
        this.AddOrUpdateFood = function () {
            if (_this.foodItem.id) {
                _this.foodUpdated.emit(_this.currentFood);
            }
            else {
                _this.foodAdded.emit(_this.currentFood);
            }
        };
    }
    FoodFormComponent.prototype.ngOnChanges = function (changes) {
        this.currentFood = Object.assign(new foodItem_1.FoodItem(), changes['foodItem'].currentValue);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', foodItem_1.FoodItem)
    ], FoodFormComponent.prototype, "foodItem", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FoodFormComponent.prototype, "foodUpdated", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FoodFormComponent.prototype, "foodAdded", void 0);
    FoodFormComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'foodform',
            templateUrl: './foodForm.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], FoodFormComponent);
    return FoodFormComponent;
}());
exports.FoodFormComponent = FoodFormComponent;
//# sourceMappingURL=foodForm.component.js.map