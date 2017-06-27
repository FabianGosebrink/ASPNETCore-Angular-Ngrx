var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Configuration } from '../../shared/configuration/app.configuration';
import { CurrentUserService } from './currentUser.service';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
var AuthenticationService = (function () {
    function AuthenticationService(http, currentUserService, router, configuration) {
        this.http = http;
        this.currentUserService = currentUserService;
        this.router = router;
        this.configuration = configuration;
    }
    AuthenticationService.prototype.loginUser = function (username, password) {
        var _this = this;
        var clientId = 'client_id=' + this.configuration.authConfig.CLIENT_ID;
        var grantType = 'grant_type=' + this.configuration.authConfig.GRANT_TYPE;
        var usernameForBody = 'username=' + username;
        var passwordForBody = 'password=' + password;
        var scope = 'scope=' + this.configuration.authConfig.SCOPE;
        var body = clientId.concat('&', grantType, '&', usernameForBody, '&', passwordForBody, '&', scope);
        var options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }) });
        return Observable.create(function (observer) {
            _this.http.post(_this.configuration.server + 'connect/token', body, options)
                .map(function (response) { return response.json(); })
                .subscribe(function (tokenData) {
                _this.currentUserService.token = tokenData.access_token;
                _this.currentUserService.username = username;
                observer.next(tokenData);
            }, function (error) { return observer.error(error); }, function () { return observer.complete(); });
        });
    };
    AuthenticationService.prototype.logoutUser = function () {
        this.currentUserService.token = null;
        this.currentUserService.username = null;
        this.router.navigate(['/home']);
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http,
        CurrentUserService,
        Router,
        Configuration])
], AuthenticationService);
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map