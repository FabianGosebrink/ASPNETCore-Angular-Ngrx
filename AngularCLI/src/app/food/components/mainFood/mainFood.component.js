var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { FoodDataService } from '../../../core/data-services/food-data.service';
import { AbstractNotificationService, MessageType } from '../../../core/services/notification.service';
import { FoodItem } from './../../../shared/models/foodItem.model';
import { Component } from '@angular/core';
var MainFoodComponent = (function () {
    function MainFoodComponent(_foodDataService, notificationService) {
        var _this = this;
        this._foodDataService = _foodDataService;
        this.notificationService = notificationService;
        this.addFood = function (foodItem) {
            _this._foodDataService
                .AddFood(foodItem)
                .subscribe(function (response) {
                _this.notificationService.showNotification(MessageType.Success, 'Food', 'Food Added!');
                _this.resetCurrentlySelectedFoodItem();
                _this.getFood();
            }, function (error) {
                console.log(error);
                _this.notificationService.showNotification(MessageType.Error, 'Food', 'There was an error :(');
            });
        };
        this.updateFood = function (foodItem) {
            _this._foodDataService
                .UpdateFood(foodItem.id, foodItem)
                .subscribe(function (response) {
                _this.notificationService.showNotification(MessageType.Success, 'Food', 'Food updated!');
                _this.resetCurrentlySelectedFoodItem();
                _this.getFood();
            }, function (error) {
                console.log(error);
                _this.notificationService.showNotification(MessageType.Error, 'Food', 'There was an error :(');
            });
        };
        this.getFood = function () {
            _this.foods = _this._foodDataService.GetAllFood();
        };
        this.resetCurrentlySelectedFoodItem();
    }
    MainFoodComponent.prototype.ngOnInit = function () {
        this.getFood();
    };
    MainFoodComponent.prototype.setCurrentlySelectedFood = function (foodItem) {
        this.foodSelectedFromList = foodItem;
    };
    MainFoodComponent.prototype.deleteFood = function (foodItem) {
        var _this = this;
        this._foodDataService
            .DeleteFood(foodItem.id)
            .subscribe(function () {
            _this.notificationService.showNotification(MessageType.Success, 'Food', 'Food deleted!');
            _this.getFood();
        }, function (error) {
            console.log(error);
            _this.notificationService.showNotification(MessageType.Error, 'Food', 'There was an error :(');
        });
    };
    MainFoodComponent.prototype.resetCurrentlySelectedFoodItem = function () {
        this.setCurrentlySelectedFood(new FoodItem());
    };
    return MainFoodComponent;
}());
MainFoodComponent = __decorate([
    Component({
        selector: 'mainFood-component',
        templateUrl: './mainFood.component.html'
    }),
    __metadata("design:paramtypes", [FoodDataService, AbstractNotificationService])
], MainFoodComponent);
export { MainFoodComponent };
//# sourceMappingURL=mainFood.component.js.map