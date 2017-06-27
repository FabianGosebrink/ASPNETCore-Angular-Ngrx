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
import { Attribute, Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
var INT_MAX = 2147483647;
var IsInRangeValidator = IsInRangeValidator_1 = (function () {
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
    return IsInRangeValidator;
}());
IsInRangeValidator = IsInRangeValidator_1 = __decorate([
    Directive({
        selector: '[isInRange][formControlName],[isInRange][formControl],[isInRange][ngModel]',
        providers: [
            { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return IsInRangeValidator_1; }), multi: true }
        ]
    }),
    __param(0, Attribute('minValue')),
    __param(1, Attribute('maxValue')),
    __metadata("design:paramtypes", [Number, Number])
], IsInRangeValidator);
export { IsInRangeValidator };
var IsInRangeValidator_1;
//# sourceMappingURL=isInRange.validator.js.map