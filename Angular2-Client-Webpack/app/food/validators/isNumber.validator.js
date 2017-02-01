var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
export var IsNumberValidator = (function () {
    function IsNumberValidator() {
    }
    IsNumberValidator.prototype.validate = function (c) {
        if (isNaN(+c.value)) {
            // console.log(c.value + " is not a number");
            return {
                isNumber: {
                    valid: false
                }
            };
        }
        // console.log(c.value + " is a number");
        return null;
    };
    IsNumberValidator = __decorate([
        Directive({
            selector: '[isNumber][formControlName],[isNumber][formControl],[isNumber][ngModel]',
            providers: [
                { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return IsNumberValidator; }), multi: true }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], IsNumberValidator);
    return IsNumberValidator;
}());
//# sourceMappingURL=isNumber.validator.js.map