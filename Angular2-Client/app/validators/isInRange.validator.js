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
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var IsInRangeValidator = (function () {
    function IsInRangeValidator() {
    }
    IsInRangeValidator.prototype.validate = function (c) {
        // self value (e.g. retype password)
        if (c.value > 2147483647 || c.value < 0) {
            return { isInRange: false };
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
        __metadata('design:paramtypes', [])
    ], IsInRangeValidator);
    return IsInRangeValidator;
}());
exports.IsInRangeValidator = IsInRangeValidator;
//# sourceMappingURL=isInRange.validator.js.map