"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var INT_MAX = 2147483647;
var IsInRangeValidator = (function () {
    function IsInRangeValidator(minValue, maxValue) {
        this._minValue = minValue || 0;
        this._maxValue = maxValue || INT_MAX;
    }
    IsInRangeValidator.prototype.validate = function (c) {
        if (+c.value > this._maxValue || +c.value < this._minValue) {
            return {
                isInRange: {
                    valid: false
                }
            };
        }
        return null;
    };
    IsInRangeValidator = __decorate([
        core_1.Directive({
            selector: '[isInRange][formControlName],[isInRange][formControl],[isInRange][ngModel]',
            providers: [
                { provide: forms_1.NG_VALIDATORS, useExisting: core_1.forwardRef(function () { return IsInRangeValidator; }), multi: true }
            ]
        }),
        __param(0, core_1.Attribute('minValue')),
        __param(1, core_1.Attribute('maxValue')), 
        __metadata('design:paramtypes', [Number, Number])
    ], IsInRangeValidator);
    return IsInRangeValidator;
}());
exports.IsInRangeValidator = IsInRangeValidator;
//# sourceMappingURL=isInRange.validator.js.map