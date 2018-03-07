import { FormControl } from '@angular/forms';
import { IsNumberValidator } from './isNumber.validator';

const INT_MAX = 2147483647;

describe('IsNumber', () => {
  let isNumberValidator: IsNumberValidator;

  // synchronous beforeEach
  beforeEach(() => {
    isNumberValidator = new IsNumberValidator();
  });

  it('validator should be instanciated', () => {
    expect(isNumberValidator).toBeDefined();
  });

  it('validator should be valid when number is passed', () => {
    const formcontrol = new FormControl();
    formcontrol.setValue(123);
    const result = isNumberValidator.validate(formcontrol);

    expect(result).toBeNull();
  });

  it('validator should be invalid when character is passed', () => {
    const formcontrol = new FormControl();
    formcontrol.setValue('s');
    const result = isNumberValidator.validate(formcontrol);

    expect(result).not.toBeNull();
    expect(result['isNumber']).not.toBeNull();
    expect(result['isNumber'].valid).toBeFalsy();
  });
});
