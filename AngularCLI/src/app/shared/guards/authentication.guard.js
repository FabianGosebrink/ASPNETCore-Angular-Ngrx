var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AuthenticationService } from '../../core/services/authentication.service';
import { CurrentUserService } from '../../core/services/currentUser.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
var AuthGuard = (function () {
    function AuthGuard(currentUserService, authService, router) {
        this.currentUserService = currentUserService;
        this.authService = authService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        return this.checkUser(state, route);
    };
    AuthGuard.prototype.canLoad = function (state) {
        return this.checkUser(state);
    };
    AuthGuard.prototype.checkUser = function (state, route) {
        if (this.currentUserService.isAuthenticated) {
            return true;
        }
        // this.authService.redirectUrl = 
        this.router.navigate(['/account/login']);
        return false;
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [CurrentUserService,
        AuthenticationService,
        Router])
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=authentication.guard.js.map