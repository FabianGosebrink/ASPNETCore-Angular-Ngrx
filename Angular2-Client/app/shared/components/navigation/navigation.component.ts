import { Configuration } from './../../configuration/app.configuration';
import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'navigation',
    templateUrl: './navigation.component.html'
})

export class NavigationComponent {

    constructor(public _configuration: Configuration) {

    }
}
