var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
var StorageService = (function () {
    function StorageService() {
        var _this = this;
        this.setItem = function (key, value) {
            _this._storage.setItem(key, JSON.stringify(value));
        };
        this.removeItem = function (key) {
            _this._storage.removeItem(key);
        };
        this.getItem = function (key) {
            var item = _this._storage.getItem(key);
            if (item && item !== 'undefined') {
                return JSON.parse(_this._storage.getItem(key));
            }
            return;
        };
        this._storage = localStorage;
    }
    return StorageService;
}());
StorageService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], StorageService);
export { StorageService };
//# sourceMappingURL=storage.service.js.map