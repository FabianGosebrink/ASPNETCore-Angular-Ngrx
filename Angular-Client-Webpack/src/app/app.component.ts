import { Configuration } from './shared/configuration/app.configuration';
import { Component } from '@angular/core';

@Component({
    selector: 'foodChooser-app',
    templateUrl: 'app.component.html'
})

export class AppComponent {

    public title: string;

    constructor(public configuration: Configuration) {
        this.title = configuration.title;
    }
}
