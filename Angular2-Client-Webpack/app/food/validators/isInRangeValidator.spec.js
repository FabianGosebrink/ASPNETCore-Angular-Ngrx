"use strict";
var forms_1 = require('@angular/forms');
var isInRange_validator_1 = require('./isInRange.validator');
var INT_MAX = 2147483647;
describe('IsInRange', function () {
    var isInRangeValidator;
    // synchronous beforeEach
    beforeEach(function () {
        isInRangeValidator = new isInRange_validator_1.IsInRangeValidator(0, INT_MAX);
    });
    it('isInRangeValidator should be instanciated', function () {
        expect(isInRangeValidator).toBeDefined();
    });
    it('isInRangeValidator should be valid', function () {
        var formcontrol = new forms_1.FormControl();
        formcontrol.setValue(123);
        var result = isInRangeValidator.validate(formcontrol);
        expect(result).toBeNull();
    });
    it('isInRangeValidator should be invalid on higher number', function () {
        var formcontrol = new forms_1.FormControl();
        formcontrol.setValue(2147483648);
        var result = isInRangeValidator.validate(formcontrol);
        expect(result).not.toBeNull();
        expect(result['isInRange']).not.toBeNull();
        expect(result['isInRange'].valid).toBeFalsy();
    });
    it('isInRangeValidator should be invalid on lower number', function () {
        var formcontrol = new forms_1.FormControl();
        formcontrol.setValue(-1);
        var result = isInRangeValidator.validate(formcontrol);
        expect(result).not.toBeNull();
        expect(result['isInRange']).not.toBeNull();
        expect(result['isInRange'].valid).toBeFalsy();
    });
});
//# sourceMappingURL=isInRangeValidator.spec.js.map