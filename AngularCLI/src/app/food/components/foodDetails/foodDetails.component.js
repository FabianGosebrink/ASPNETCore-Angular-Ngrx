var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'rxjs/add/operator/map';
import { FoodDataService } from '../../../core/data-services/food-data.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
var FoodDetailsComponent = (function () {
    function FoodDetailsComponent(route, foodDataService) {
        this.route = route;
        this.foodDataService = foodDataService;
    }
    FoodDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap
            .map(function (paramMap) { return paramMap.get('foodId') || '-1'; })
            .subscribe(function (foodId) {
            _this.selectedFoodItem = _this.foodDataService.GetSingleFood(foodId);
        });
    };
    return FoodDetailsComponent;
}());
FoodDetailsComponent = __decorate([
    Component({
        selector: 'foodDetails-component',
        templateUrl: './foodDetails.component.html'
    }),
    __metadata("design:paramtypes", [ActivatedRoute, FoodDataService])
], FoodDetailsComponent);
export { FoodDetailsComponent };
//# sourceMappingURL=foodDetails.component.js.map