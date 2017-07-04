var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CpuValueService } from '../../../core/services/cpuValue.service';
import { PlatformInformationProvider } from '../../../core/services/platformInformation.provider';
import { Component, NgZone } from '@angular/core';
var EMealFooterComponent = (function () {
    function EMealFooterComponent(cpuValueService, platformInformationProvider, ngZone) {
        var _this = this;
        this.cpuValueService = cpuValueService;
        this.platformInformationProvider = platformInformationProvider;
        this.ngZone = ngZone;
        cpuValueService.onNewCpuValue.subscribe(function (cpuValue) {
            ngZone.run(function () {
                _this.percentage = cpuValue;
            });
        });
    }
    EMealFooterComponent.prototype.ngOnInit = function () { };
    return EMealFooterComponent;
}());
EMealFooterComponent = __decorate([
    Component({
        selector: 'eMeal-footer',
        templateUrl: 'eMeal-footer.component.html'
    }),
    __metadata("design:paramtypes", [CpuValueService,
        PlatformInformationProvider,
        NgZone])
], EMealFooterComponent);
export { EMealFooterComponent };
//# sourceMappingURL=eMeal-footer.component.js.map