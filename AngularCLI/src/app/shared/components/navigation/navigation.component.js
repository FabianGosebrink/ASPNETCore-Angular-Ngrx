var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AuthenticationService } from '../../../core/services/authentication.service';
import { CurrentUserService } from '../../../core/services/currentUser.service';
import { Configuration } from './../../configuration/app.configuration';
import { Component } from '@angular/core';
var NavigationComponent = (function () {
    function NavigationComponent(configuration, currentUserService, authenticationService) {
        this.configuration = configuration;
        this.currentUserService = currentUserService;
        this.authenticationService = authenticationService;
    }
    NavigationComponent.prototype.logout = function ($event) {
        $event.preventDefault();
        this.authenticationService.logoutUser();
    };
    NavigationComponent.prototype.doNothing = function ($event) {
        $event.preventDefault();
    };
    return NavigationComponent;
}());
NavigationComponent = __decorate([
    Component({
        selector: 'navigation',
        templateUrl: 'navigation.component.html'
    }),
    __metadata("design:paramtypes", [Configuration,
        CurrentUserService,
        AuthenticationService])
], NavigationComponent);
export { NavigationComponent };
//# sourceMappingURL=navigation.component.js.map