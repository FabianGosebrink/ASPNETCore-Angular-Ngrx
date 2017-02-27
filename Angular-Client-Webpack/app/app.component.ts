import { Configuration } from './shared/configuration/app.configuration';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'foodChooser-app',
    templateUrl: 'app.component.html'
})


export class AppComponent {

    public title: string;

    constructor(private _configuration: Configuration, private _location: Location) {
        this.title = _configuration.title;
    }
}
