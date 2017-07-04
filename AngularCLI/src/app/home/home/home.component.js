var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import './home.component.css';
import { AbstractNotificationService, MessageType } from '../../../core/services/notification.service';
import { PlatformInformationProvider } from '../../../core/services/platformInformation.provider';
import { FoodDataService } from './../../../core/data-services/food-data.service';
import { Component } from '@angular/core';
var HomeComponent = (function () {
    function HomeComponent(foodDataService, notificationService, platformInformationProvider) {
        this.foodDataService = foodDataService;
        this.notificationService = notificationService;
        this.platformInformationProvider = platformInformationProvider;
        this.randomFood = [];
        this.isWorking = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.getFood();
        this.getRandomMeal();
    };
    HomeComponent.prototype.updateFood = function () {
        this.getRandomMeal();
    };
    HomeComponent.prototype.getFood = function () {
        this.allFood = this.foodDataService.GetAllFood();
    };
    HomeComponent.prototype.getRandomMeal = function () {
        var _this = this;
        this.isWorking = true;
        this.foodDataService
            .GetRandomMeal()
            .subscribe(function (response) {
            if (!response) {
                _this.notificationService.showNotification(MessageType.Info, 'Oh Snap...', 'No food found...');
                return;
            }
            _this.randomFood = response;
            _this.notificationService.showNotification(MessageType.Success, 'Oh hey...', 'Food Loaded');
        }, function (error) {
            console.log(error);
            _this.notificationService.showNotification(MessageType.Error, 'Uh oh...', 'There was an Error');
        }, function () { return _this.isWorking = false; });
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    Component({
        selector: 'home-component',
        templateUrl: './home.component.html'
    }),
    __metadata("design:paramtypes", [FoodDataService,
        AbstractNotificationService,
        PlatformInformationProvider])
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map