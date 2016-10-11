import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IsNumberValidator } from '../validators/isNumber.validator';
import { IsInRangeValidator } from '../validators/isInRange.validator';

@NgModule({
    imports: [
        // Modules
        BrowserModule
    ],

    declarations: [

        // Components & directives

        IsNumberValidator,
        IsInRangeValidator
    ],

    providers: [
        // Services
    ],

    exports: [
        IsNumberValidator,
        IsInRangeValidator
    ]
})

export class SharedModule { }