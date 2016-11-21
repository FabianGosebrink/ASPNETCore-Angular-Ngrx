import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IsNumberValidator } from '../validators/isNumber.validator';
import { IsInRangeValidator } from '../validators/isInRange.validator';

import { FilterPipe } from '../pipes/filter.pipe';

@NgModule({
    imports: [
        // Modules
        BrowserModule
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