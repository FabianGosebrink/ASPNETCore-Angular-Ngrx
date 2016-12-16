import { FormControl } from '@angular/forms';
import { IsInRangeValidator } from './isInRange.validator';

const INT_MAX = 2147483647;

describe('IsInRange', () => {

    let isInRangeValidator: IsInRangeValidator;

    // synchronous beforeEach
    beforeEach(() => {
        isInRangeValidator = new IsInRangeValidator(0, INT_MAX);
    });

    it('isInRangeValidator should be instanciated', () => {
        expect(isInRangeValidator).toBeDefined();
    });

    it('isInRangeValidator should be valid', () => {

        let formcontrol = new FormControl();
        formcontrol.setValue(123);
        let result = isInRangeValidator.validate(formcontrol);

        expect(result).toBeNull();

    });

    it('isInRangeValidator should be invalid on higher number', () => {

        let formcontrol = new FormControl();
        formcontrol.setValue(2147483648);
        let result = isInRangeValidator.validate(formcontrol);

        expect(result).not.toBeNull();
        expect(result['isInRange']).not.toBeNull();
        expect(result['isInRange'].valid).toBeFalsy();
    });

    it('isInRangeValidator should be invalid on lower number', () => {

        let formcontrol = new FormControl();
        formcontrol.setValue(-1);
        let result = isInRangeValidator.validate(formcontrol);

        expect(result).not.toBeNull();
        expect(result['isInRange']).not.toBeNull();
        expect(result['isInRange'].valid).toBeFalsy();
    });
});
