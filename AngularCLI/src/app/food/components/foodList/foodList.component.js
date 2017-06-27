var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Sorter } from '../../../core/services/sort.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
var FoodListComponent = (function () {
    function FoodListComponent(sorter) {
        var _this = this;
        this.sorter = sorter;
        this.foodSelected = new EventEmitter();
        this.foodDeleted = new EventEmitter();
        this.setFoodToDelete = function (foodItem) {
            _this.foodToDelete = foodItem;
        };
    }
    FoodListComponent.prototype.sortArray = function (key, $event) {
        if ($event) {
            $event.preventDefault();
        }
        this.sorter.sort(key, this.foods);
    };
    return FoodListComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Array)
], FoodListComponent.prototype, "foods", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], FoodListComponent.prototype, "foodSelected", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], FoodListComponent.prototype, "foodDeleted", void 0);
FoodListComponent = __decorate([
    Component({
        selector: 'foodlist',
        templateUrl: './foodList.component.html'
    }),
    __metadata("design:paramtypes", [Sorter])
], FoodListComponent);
export { FoodListComponent };
//# sourceMappingURL=foodList.component.js.map