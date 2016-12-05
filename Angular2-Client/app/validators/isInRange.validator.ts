import { Directive, forwardRef } from '@angular/core';
import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms';

@Directive({
    selector: '[isInRange][formControlName],[isInRange][formControl],[isInRange][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => IsInRangeValidator), multi: true }
    ]
})

export class IsInRangeValidator implements Validator {

    validate(c: FormControl): { [key: string]: any } {
        // self value (e.g. retype password)

        if (c.value > 2147483647 || c.value < 0) {
            return {
                isInRange:
                {
                    valid: false
                }
            };
        }

        return null;
    }
}
