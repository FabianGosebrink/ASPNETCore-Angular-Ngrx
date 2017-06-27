var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { FoodItem } from './../../../shared/models/foodItem.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';
var FoodFormComponent = (function () {
    function FoodFormComponent() {
        var _this = this;
        this.types = ['Starter', 'Main', 'Dessert'];
        this.foodUpdated = new EventEmitter();
        this.foodAdded = new EventEmitter();
        this.AddOrUpdateFood = function () {
            _this.foodItem.id ? _this.foodUpdated.emit(_this.currentFood) : _this.foodAdded.emit(_this.currentFood);
        };
    }
    FoodFormComponent.prototype.ngOnChanges = function (changes) {
        this.currentFood = Object.assign(new FoodItem(), changes['foodItem'].currentValue);
    };
    return FoodFormComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", FoodItem)
], FoodFormComponent.prototype, "foodItem", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], FoodFormComponent.prototype, "foodUpdated", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], FoodFormComponent.prototype, "foodAdded", void 0);
FoodFormComponent = __decorate([
    Component({
        selector: 'foodform',
        templateUrl: './foodForm.component.html'
    })
], FoodFormComponent);
export { FoodFormComponent };
//# sourceMappingURL=foodForm.component.js.map