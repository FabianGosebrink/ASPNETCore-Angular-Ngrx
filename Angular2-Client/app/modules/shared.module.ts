import { NgModule } from '@angular/core';

import { IsNumberValidator } from '../validators/isNumber.validator';
import { IsInRangeValidator } from '../validators/isInRange.validator';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../pipes/filter.pipe';

@NgModule({
    imports: [
        // Modules
        CommonModule
    ],

    declarations: [

        // Components & directives

        IsNumberValidator,
        IsInRangeValidator,
        FilterPipe
    ],

    providers: [
        // Services
    ],

    exports: [
        IsNumberValidator,
        IsInRangeValidator,
        FilterPipe
    ]
})

export class SharedModule { }