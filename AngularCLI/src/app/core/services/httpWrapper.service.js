var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CurrentUserService } from '../services/currentUser.service';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
var HttpWrapperService = (function () {
    function HttpWrapperService(http, currentUserService) {
        var _this = this;
        this.http = http;
        this.currentUserService = currentUserService;
        this.get = function (url, options) {
            options = _this.prepareOptions(options);
            return _this.http.get(url, options);
        };
        this.post = function (url, body, options) {
            options = _this.prepareOptions(options);
            return _this.http.post(url, body, options);
        };
        this.put = function (url, body, options) {
            options = _this.prepareOptions(options);
            return _this.http.put(url, body, options);
        };
        this.delete = function (url, options) {
            options = _this.prepareOptions(options);
            return _this.http.delete(url, options);
        };
        this.patch = function (url, body, options) {
            options = _this.prepareOptions(options);
            return _this.http.patch(url, body, options);
        };
    }
    HttpWrapperService.prototype.prepareOptions = function (options) {
        var token = this.currentUserService.token;
        options = options || {};
        if (!options.headers) {
            options.headers = new Headers();
        }
        if (token) {
            options.headers.append('Authorization', 'Bearer ' + token);
        }
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');
        return options;
    };
    return HttpWrapperService;
}());
HttpWrapperService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, CurrentUserService])
], HttpWrapperService);
export { HttpWrapperService };
//# sourceMappingURL=httpWrapper.service.js.map